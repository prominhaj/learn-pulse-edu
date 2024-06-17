'use server';

import { createCourse } from '@/queries/courses';

export const addNewCourse = async (data) => {
    try {
        const course = await createCourse(data);
        return course;
    } catch (error) {
        throw new Error(error);
    }
};
