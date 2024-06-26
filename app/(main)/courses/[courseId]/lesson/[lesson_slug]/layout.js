import { hasEnrollmentForCourse } from '@/queries/enrollments';
import { CourseSidebar } from './_components/CourseSideBar/course-sidebar';
import { getUserData } from '@/lib/getUserData';
import { redirect } from 'next/navigation';
import { getCourseByCourseId } from '@/queries/courses';

const CourseLayout = async ({ children, params: { lesson_slug, courseId } }) => {
    const user = await getUserData();
    const isEnrollmentForCourse = await hasEnrollmentForCourse(courseId, user?.id);
    const course = await getCourseByCourseId(courseId);

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
                    <main className='lg:col-span-4'>{children}</main>
                    <div className='inset-y-0 z-30 lg:col-span-2'>
                        <CourseSidebar course={course} lessonSlug={lesson_slug} />
                    </div>
                </div>
            </div>
        </>
    );
};
export default CourseLayout;
