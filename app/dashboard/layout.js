import { Navbar } from './_components/navbar';
import Sidebar from './_components/sidebar';

const DashboardLayout = ({ children }) => {
    return (
        <div className='relative h-full'>
            <div className='h-[80px] lg:pl-56 fixed inset-y-0 w-full z-50'>
                <Navbar />
            </div>
            <div className='fixed inset-y-0 z-50 flex-col hidden w-56 h-full lg:flex'>
                <Sidebar />
            </div>
            <main className='lg:pl-56 pt-[80px] h-full'>{children}</main>
        </div>
    );
};
export default DashboardLayout;
