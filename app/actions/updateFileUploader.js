'use server';

import User from '@/modals/users-modal';
import { fileUploader } from './fileUploader';
import { revalidatePath } from 'next/cache';

export const updateUserImage = async (formData, fileName, folder, oldPublicId, userId) => {
    try {
        const uploadResult = await fileUploader(formData, fileName, folder, oldPublicId);
        // Update in Database
        const user = await User.findById(userId);
        user.profilePicture = {
            url: uploadResult.url,
            public_id: uploadResult.public_id
        };
        await user.save();

        revalidatePath('/');

        return {
            success: true,
            message: 'Profile picture updated successfully'
        };
    } catch (error) {
        throw new Error(error);
    }
};
