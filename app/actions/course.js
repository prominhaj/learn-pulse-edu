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
