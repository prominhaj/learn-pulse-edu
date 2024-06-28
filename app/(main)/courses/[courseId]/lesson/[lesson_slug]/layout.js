import { hasEnrollmentForCourse } from '@/queries/enrollments';
import { getUserData } from '@/lib/getUserData';
import { redirect } from 'next/navigation';

const CourseLayout = async ({ courseSideBar, videoPage, params: { courseId } }) => {
    const user = await getUserData();
    const isEnrollmentForCourse = await hasEnrollmentForCourse(courseId, user?.id);

    if (!user) {
        return redirect('/login');
    }

    if (!isEnrollmentForCourse) {
        return redirect('/');
    }

    return (
        <>
            {/* Back Ground Color */}

            <div className='container px-3 pt-5 pb-10 md:px-8'>
                <div className='grid grid-cols-1 gap-5 md:gap-8 lg:grid-cols-6'>
                    <main className='lg:col-span-4'>{videoPage}</main>
                    <div className='inset-y-0 z-30 lg:col-span-2'>{courseSideBar}</div>
                </div>
            </div>
        </>
    );
};
export default CourseLayout;
