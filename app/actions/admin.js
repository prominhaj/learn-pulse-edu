'use server';

import User from '@/modals/users-modal';
import { revalidatePath } from 'next/cache';

export const changeRoleByInstructor = async (id, type) => {
    try {
        await User.findByIdAndUpdate(id, { role: type });

        revalidatePath('/');

        return {
            success: true,
            message: 'Instructor role change successfully'
        };
    } catch (error) {
        throw new Error(error);
    }
};
