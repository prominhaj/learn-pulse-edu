import { getUserByEmail } from '@/queries/users';
import { getServerSession } from 'next-auth';

export const getUserData = async () => {
    try {
        const session = await getServerSession();
        const getFindByEmail = await getUserByEmail(session?.user?.email);
        return getFindByEmail;
    } catch (error) {
        throw new Error(error);
    }
};
