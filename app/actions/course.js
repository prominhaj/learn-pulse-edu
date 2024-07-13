'use server';

import { getSlug } from '@/lib/convertData';
import { fileDelete } from '@/lib/file-upload';
import Course from '@/modals/courses-modal';
import Enrollment from '@/modals/enrollment-model';
import Lesson from '@/modals/lessons-modal';
import Module from '@/modals/modules-modal';
import { createCourse } from '@/queries/courses';
import { revalidatePath } from 'next/cache';
import { deleteFile } from './fileUploader';

export const addNewCourse = async (data) => {
    try {
        const course = await createCourse(data);
        return course;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateCourse = async (courseId, updatedData) => {
    try {
        await Course.findByIdAndUpdate(courseId, updatedData);

        // revalidate path
        revalidatePath(`/dashboard/courses/${courseId}`);

        return {
            success: true
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const coursePublished = async (courseId) => {
    try {
        const course = await Course.findById(courseId);
        await Course.findByIdAndUpdate(courseId, {
            active: !course?.active
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteCourse = async (courseId) => {
    try {
        // Fetch the course along with its modules and lessons in one go
        const course = await Course.findById(courseId).populate({
            path: 'modules',
            populate: {
                path: 'lessonIds'
            }
        });

        if (!course) {
            throw new Error('Course not found');
        }

        const modules = course.modules;
        const courseSlug = getSlug(course?.title);

        // Delete the course thumbnail if it exists
        if (course.thumbnail?.public_id) {
            await deleteFile(course.thumbnail.public_id, 'image');
        }

        // Delete associated files and documents
        await Promise.all(
            modules.map(async (module) => {
                const lessons = module.lessonIds;

                // Delete lesson videos if they exist
                await Promise.all(
                    lessons.map(async (lesson) => {
                        if (lesson?.video?.fileName) {
                            await fileDelete(`courses/${courseSlug}`, lesson.video?.fileName);
                        }
                    })
                );

                // Delete all lessons in the module
                await Lesson.deleteMany({ _id: { $in: lessons.map((lesson) => lesson._id) } });

                // Delete the module itself
                await Module.findByIdAndDelete(module._id);
            })
        );

        // delete all enrollments in the course
        await Enrollment.deleteMany({ course_id: courseId });
        await Course.findByIdAndDelete(courseId);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Updated Quiz Set
export const updateCourseQuizSet = async (courseId, updateQuizSetId) => {
    try {
        await Course.findByIdAndUpdate(courseId, updateQuizSetId);

        // Revalidation Path
        revalidatePath(`/dashboard/courses/${courseId}`);
    } catch (error) {
        throw new Error(error);
    }
};

// Learning

export const addNewLearning = async (learningData, courseId) => {
    try {
        const course = await Course.findById(courseId);
        course.learning.push(learningData);
        course.save();
    } catch (error) {
        throw new Error(error);
    }
};

export const updateLearning = async (newLearningItem, oldLearningItem, courseId) => {
    try {
        const course = await Course.findById(courseId);
        const index = course.learning.indexOf(oldLearningItem);
        if (index !== -1) {
            course.learning[index] = newLearningItem;
        }
        await course.save();
        return JSON.parse(JSON.stringify(course?.learning));
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteLearning = async (deleteItem, courseId) => {
    try {
        const course = await Course.findById(courseId);
        course.learning.pull(deleteItem);
        course.save();
        return JSON.parse(JSON.stringify(course?.learning));
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteIntroductionVideo = async (courseId, folderName, fileName) => {
    try {
        const file = await fileDelete(folderName, fileName);
        if (file) {
            await Course.findByIdAndUpdate(courseId, { introductionVideo: null });
        }

        revalidatePath(`/dashboard/courses/${courseId}`);
    } catch (error) {
        throw new Error(error);
    }
};
