import NoAccess from '@/components/globals/NoAccess/NoAccess';
import { Navbar } from './_components/navbar';
import Sidebar from './_components/sidebar';
import { getUserData } from '@/lib/getUserData';

const DashboardLayout = async ({ children }) => {
    const user = await getUserData();

    if (!user || user?.role !== 'Teacher') {
        return <NoAccess />;
    }

    return (
        <div className='relative h-full'>
            <div className='h-[80px] lg:pl-56 fixed inset-y-0 w-full z-50'>
                <Navbar />
            </div>
            <div className='fixed inset-y-0 z-50 flex-col hidden h-full w-60 lg:flex'>
                <Sidebar />
            </div>
            <main className='lg:pl-60 pt-[80px] h-full'>{children}</main>
        </div>
    );
};
export default DashboardLayout;
