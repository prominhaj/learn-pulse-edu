'use server';
import User from '@/modals/users-modal';
import bcrypt from 'bcryptjs';

export const createAccount = async (userData) => {
    try {
        const user = await User.findOne({ email: userData.email });
        if (user) {
            return {
                success: false,
                message: 'User already exists'
            };
        }

        const password = await bcrypt.hash(userData.password, 10);
        await User.create({ ...userData, password });

        return {
            success: true,
            message: 'Account created successfully'
        };
    } catch (error) {
        throw new Error(error);
    }
};
