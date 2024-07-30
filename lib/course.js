import { getCourseByCourseId } from '@/queries/courses';
import { getModuleByLesson } from '@/queries/module';
import { getAReport } from '@/queries/reports';
import { getUserData } from './getUserData';

export const getCourseProgress = async (courseId) => {
    const user = await getUserData();
    try {
        const filter = {
            user_id: user?.id,
            course_id: courseId
        };

        const report = await getAReport(filter);
        const course = await getCourseByCourseId(courseId);
        const modulesIds = course?.modules;

        const lessons = await Promise.all(
            modulesIds.map(async (module) => {
                return await getModuleByLesson(module, true);
            })
        );

        const totalLessonCount = await lessons?.reduce((acc, les) => acc + les, 0);
        const completedLessonCount = report?.totalCompletedLessons?.length;
        const totalProgress =
            totalLessonCount > 0 ? (completedLessonCount / totalLessonCount) * 100 : 0;

        return totalProgress > 100 ? 100 : totalProgress;
    } catch (error) {
        throw new Error(error);
    }
};

export const getFindCourseFastLesson = async (courseId) => {
    try {
        const course = await getCourseByCourseId(courseId);
        const modulesIds = course?.modules;

        const modules = await Promise.all(
            modulesIds
                .map(async (module) => {
                    return await getModuleByLesson(module);
                })
                .flat()
        );
        const modulesSorted = modules?.sort((a, b) => a.order - b.order);
        const fastLesson = modulesSorted?.find((module) => {
            return module?.lessonIds?.find((lesson) => lesson.order === 0);
        })?.lessonIds[0];

        return fastLesson;
    } catch (error) {
        throw new Error(error);
    }
};
