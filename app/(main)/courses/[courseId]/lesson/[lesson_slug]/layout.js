import { hasEnrollmentForCourse } from '@/queries/enrollments';
import { CourseSidebar } from './_components/CourseSideBar/course-sidebar';
import { getUserData } from '@/lib/getUserData';
import { redirect } from 'next/navigation';
import { getCourseByCourseId } from '@/queries/courses';

const CourseLayout = async ({ children, params: { lesson_slug, courseId } }) => {
    const user = await getUserData();
    const isEnrollmentForCourse = await hasEnrollmentForCourse(courseId, user?.id);
    const course = await getCourseByCourseId(courseId);
    console.log(course);
    if (!user) {
        return redirect('/login');
    }

    if (!isEnrollmentForCourse) {
        return redirect('/');
    }

    return (
        <>
            {/* Back Ground Color */}
            <div className='relative w-full h-full bg-slate-950'>
                <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [maskImage:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
            </div>

            <div className='container px-3 pt-5 pb-10 md:px-8'>
                <div className='grid grid-cols-1 gap-5 md:gap-8 lg:grid-cols-6'>
                    <main className='lg:col-span-4'>{children}</main>
                    <div className='inset-y-0 z-30 lg:col-span-2'>
                        <CourseSidebar />
                    </div>
                </div>
            </div>
        </>
    );
};
export default CourseLayout;
