import { useSession } from 'next-auth/react';

const useAuth = () => {
    const session = useSession();
    return {
        user: session?.data?.user,
        status: session?.status
    };
};

export default useAuth;
