'use server';
import User from '@/modals/users-modal';
import bcrypt from 'bcryptjs';
import { fileUploader } from './fileUploader';

export const createAccount = async (userData, formData) => {
    try {
        const userExists = await User.exists({ email: userData.email });
        if (userExists) {
            return { success: false, message: 'User already exists' };
        }

        const password = await bcrypt.hash(userData.password, 10);
        const userParams = {
            ...userData,
            password,
            role: 'Student',
            profilePicture: {}
        };

        if (formData) {
            const file = await fileUploader(formData, 'profilePicture', 'Images/users');
            if (file.url) {
                userParams.role = 'Teacher';
                userParams.profilePicture = { url: file.url, public_id: file.public_id };
            } else {
                throw new Error('Failed to upload profile picture');
            }
        }

        await User.create(userParams);
        return { success: true, message: 'Account created successfully' };
    } catch (error) {
        throw new Error(error.message || 'Failed to create account');
    }
};
