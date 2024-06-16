import { getEnrollmentsForCourse } from '@/queries/enrollments';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { populateEnrollmentData } from '@/lib/dashboard-helper';
import { getCourseByCourseId } from '@/queries/courses';

const EnrollmentsPage = async ({ params: { courseId } }) => {
    const course = await getCourseByCourseId(courseId);
    const enrollments = await getEnrollmentsForCourse(courseId);
    const enrollmentsData = await populateEnrollmentData(enrollments);
    console.log(enrollmentsData);
    return (
        <div className='p-6'>
            <h2>{course?.title}</h2>
            <DataTable columns={columns} data={enrollmentsData} />
        </div>
    );
};

export default EnrollmentsPage;
