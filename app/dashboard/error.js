'use client';
import Error from '@/components/globals/Error/Error';

const DashboardLayoutError = ({ error, reset }) => {
    return (
        <>
            <Error error={error} reset={reset} content='Dashboard Layout Error' />
        </>
    );
};

export default DashboardLayoutError;
