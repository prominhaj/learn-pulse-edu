'use server';
import User from '@/modals/users-modal';
import bcrypt from 'bcryptjs';
import { fileUploader } from './fileUploader';
import { revalidatePath } from 'next/cache';
import { passwordValidations } from '@/lib/FormValidation/users/userSchema';

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

export const updateUserPersonalDetails = async (userInfo, userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        await User.findByIdAndUpdate(userId, userInfo);

        revalidatePath('/account');

        return { success: true, message: 'User updated successfully' };
    } catch (error) {
        throw new Error(error);
    }
};

export const changeUserPassword = async (formData, userId) => {
    // Form Data
    const oldPassword = formData.get('oldPassword');
    const newPassword = formData.get('newPassword');
    const retypePassword = formData.get('confirmPassword');

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Check Old Password
        const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatched) {
            return {
                error: true,
                message: 'Old Password does not match'
            };
        }

        // Password Validation
        const validatedFields = passwordValidations.safeParse({
            password: newPassword,
            confirmPassword: retypePassword
        });
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors
            };
        }

        // Check Old Password And New Password
        if (oldPassword === newPassword) {
            return {
                error: true,
                message: 'Old Password and New Password cannot be same'
            };
        }

        // Hash New Password
        const password = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, { password });

        // Revalidate Old Password
        revalidatePath('/account');

        return {
            success: true,
            message: 'Password updated successfully'
        };
    } catch (error) {
        throw new Error(error.message);
    }
};
