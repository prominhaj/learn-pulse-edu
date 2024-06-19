'use server';

import Course from '@/modals/courses-modal';
import { createCourse } from '@/queries/courses';

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

export const updateLearning = async () => {};

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
