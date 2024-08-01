'use client';
import Error from '@/components/globals/Error/Error';

const LayoutError = ({ error, reset }) => {
    return (
        <>
            <Error error={error} reset={reset} content='Layout Error' />
        </>
    );
};

export default LayoutError;
