'use server';

import { enrollForCourse } from '@/queries/enrollments';
import { revalidatePath } from 'next/cache';

export const createNewEnrollment = async (enrollData) => {
    try {
        const enrolled = await enrollForCourse(enrollData);

        // Revalidate Paths
        revalidatePath(`/free-enroll`);

        return enrolled;
    } catch (error) {
        throw new Error(error);
    }
};
