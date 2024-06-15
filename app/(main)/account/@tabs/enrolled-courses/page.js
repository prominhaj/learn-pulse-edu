import EnrollCourseCard from '@/components/globals/Enroll-CourseCard/EnrollCourseCard';
import { getEnrollmentsForUser } from '@/queries/enrollments';
import { getUserByEmail } from '@/queries/users';
import { getServerSession } from 'next-auth';

const EnrolledCourses = async () => {
    const { user } = await getServerSession();
    const userData = await getUserByEmail(user?.email);
    const enrollCourses = await getEnrollmentsForUser(userData?.id);

    return enrollCourses ? (
        <div className='flex items-center justify-center'>
            <h2 className='text-2xl font-semibold text-muted-foreground'>No Enrolls Course</h2>
        </div>
    ) : (
        <div className='grid gap-6 sm:grid-cols-2'>
            {enrollCourses?.map((enrollCourse) => (
                <EnrollCourseCard key={enrollCourse.id} enrollCourse={enrollCourse} />
            ))}
        </div>
    );
};

export default EnrolledCourses;
