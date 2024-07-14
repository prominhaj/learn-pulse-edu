import { getEnrollmentsForCourse } from '@/queries/enrollments';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { populateEnrollmentData } from '@/lib/dashboard-helper';
import { getCourseByCourseId } from '@/queries/courses';
import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';

const items = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Courses',
        href: '/dashboard/courses'
    },
    {
        label: 'Enrollments',
        current: true
    }
];

const EnrollmentsPage = async ({ params: { courseId } }) => {
    const course = await getCourseByCourseId(courseId);
    const enrollments = await getEnrollmentsForCourse(courseId);
    const enrollmentsData = await populateEnrollmentData(enrollments);

    return (
        <>
            <BreadcrumbSection items={items} />
            <div className='p-6'>
                <h2>{course?.title}</h2>
                <DataTable columns={columns} data={enrollmentsData} />
            </div>
        </>
    );
};

export default EnrollmentsPage;
