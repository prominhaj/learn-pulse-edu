import { CourseSidebar } from './_components/course-sidebar';

const CourseLayout = ({ children }) => {
    return (
        <div className='container px-3 pt-5 pb-10 md:px-8'>
            <div className='grid grid-cols-1 gap-5 md:gap-8 lg:grid-cols-6'>
                <main className='lg:col-span-4'>{children}</main>
                <div className='inset-y-0 z-30 lg:col-span-2'>
                    <CourseSidebar />
                </div>
            </div>
        </div>
    );
};
export default CourseLayout;
