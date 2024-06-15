import EnrollCourseCard from '@/components/globals/Enroll-CourseCard/EnrollCourseCard';
import { getEnrollmentsForUser } from '@/queries/enrollments';
import { getUserByEmail } from '@/queries/users';
import { getServerSession } from 'next-auth';

const EnrolledCourses = async () => {
    const { user } = await getServerSession();
    const userData = await getUserByEmail(user?.email);
    const enrollCourses = await getEnrollmentsForUser(userData?.id);

    return (
        <div className='grid gap-6 sm:grid-cols-2'>
            {enrollCourses?.map((enrollCourse) => (
                <EnrollCourseCard key={enrollCourse.id} enrollCourse={enrollCourse} />
            ))}
        </div>
    );
};

export default EnrolledCourses;
