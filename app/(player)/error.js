'use client';
import Error from '@/components/globals/Error/Error';

const PlayerLayoutError = ({ error, reset }) => {
    return (
        <>
            <Error error={error} reset={reset} content='Player Layout Error' />
        </>
    );
};

export default PlayerLayoutError;
