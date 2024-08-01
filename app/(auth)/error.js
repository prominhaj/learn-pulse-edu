'use client';
import Error from '@/components/globals/Error/Error';

const AuthLayoutError = ({ error, reset }) => {
    return (
        <>
            <Error error={error} reset={reset} content='Auth Layout Error' />
        </>
    );
};

export default AuthLayoutError;
