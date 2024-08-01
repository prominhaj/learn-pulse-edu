'use client';
import Error from '@/components/globals/Error/Error';

const AdminDashboardError = ({ error, reset }) => {
    return (
        <>
            <Error error={error} reset={reset} content='Admin Dashboard Error' />
        </>
    );
};

export default AdminDashboardError;
