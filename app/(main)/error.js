'use client';

import Error from '@/components/globals/Error/Error';

const MainLayoutError = ({ error, reset }) => {
    return (
        <>
            <Error error={error} reset={reset} content='Main Layout Error' />
        </>
    );
};

export default MainLayoutError;
