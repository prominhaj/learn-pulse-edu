import { replaceMongoIdInObject } from '@/lib/convertData';
import User from '@/modals/users-modal';

export const getUserByEmail = async (email) => {
    const user = await User.findOne({ email: email }).select('-password').lean();
    return replaceMongoIdInObject(user);
};
