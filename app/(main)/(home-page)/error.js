'use client';

import Error from '@/components/globals/Error/Error';

const HomeLayoutError = ({ error, reset }) => {
    return (
        <>
            <Error error={error} reset={reset} content='Home Page Error' />
        </>
    );
};

export default HomeLayoutError;
