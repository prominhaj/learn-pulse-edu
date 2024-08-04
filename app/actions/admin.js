'use server';

import User from '@/modals/users-modal';
import { revalidatePath } from 'next/cache';

export const removeInstructorToStudentRole = async (id) => {
    try {
        await User.findByIdAndUpdate(id, { role: 'Student' });

        revalidatePath('/');

        return {
            success: true,
            message: 'Instructor removed to student role successfully'
        };
    } catch (error) {
        throw new Error(error);
    }
};
