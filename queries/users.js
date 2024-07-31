import { replaceMongoIdInObject } from '@/lib/convertData';
import User from '@/modals/users-modal';

export const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email }).select('-password').lean();
        return replaceMongoIdInObject(user);
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserByUserId = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password').lean();
        return replaceMongoIdInObject(user);
    } catch (error) {
        throw new Error(error);
    }
};

export const getTotalUsers = async () => {
    try {
        const users = await User.estimatedDocumentCount();
        return users;
    } catch (error) {
        throw new Error(error);
    }
};
