import { replaceMongoIdInObject } from '@/lib/convertData';
import Assessment from '@/modals/assessment-model';
import Module from '@/modals/modules-modal';
import Report from '@/modals/report-model';
import mongoose from 'mongoose';
import { getCourseByCourseId } from './courses';

export const getAReport = async (filter) => {
    try {
        const report = await Report.findOne(filter)
            .populate({
                path: 'quizAssessment',
                model: Assessment
            })
            .lean();
        return replaceMongoIdInObject(report);
    } catch (error) {
        throw new Error(error);
    }
};

export const createWatchReport = async ({ courseId, userId, moduleId, lessonId }) => {
    try {
        let report = await Report.findOne({
            course_id: courseId,
            user_id: userId
        });

        if (!report) {
            report = await Report.create({
                course_id: courseId,
                user_id: userId
            });
        }

        const foundLesson = report.totalCompletedLessons.find((lId) => lId.toString() === lessonId);

        if (!foundLesson) {
            report.totalCompletedLessons.push(new mongoose.Types.ObjectId(lessonId));
        }

        const getModule = await Module.findById(moduleId);
        const lessonIdsToCheck = getModule.lessonIds;
        const completedLessonsIds = report.totalCompletedLessons;

        const isModuleComplete = lessonIdsToCheck.every((lesson) =>
            completedLessonsIds.includes(lesson)
        );

        if (isModuleComplete) {
            const foundModule = report.totalCompletedModules.find(
                (module) => module.toString() === moduleId
            );
            if (!foundModule) {
                report.totalCompletedModules.push(new mongoose.Types.ObjectId(moduleId));
            }
        }

        // If so, add the completion time.
        const course = await getCourseByCourseId(courseId);
        const modulesInCourse = course?.modules;
        const moduleCount = modulesInCourse?.length ?? 0;

        const completedModule = report?.totalCompletedModules;
        const completedModuleCount = completedModule?.length ?? 0;

        if (completedModuleCount >= 1 && completedModuleCount === moduleCount) {
            report.completion_date = Date.now();
        }

        report.save();
    } catch (error) {
        throw new Error(error);
    }
};
