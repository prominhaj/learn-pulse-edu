import EnrollmentPageContent from '@/app/dashboard/courses/[courseId]/enrollments/_components/EnrollmentPageContent';
import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';

const items = [
    {
        label: 'Dashboard',
        href: '/admin/dashboard'
    },
    {
        label: 'Courses',
        href: '/admin/courses'
    },
    {
        label: 'Enrollments',
        current: true
    }
];

const AdminCourseEnrollments = ({ params: { courseId } }) => {
    return (
        <>
            <BreadcrumbSection items={items} />
            <EnrollmentPageContent courseId={courseId} />
        </>
    );
};

export default AdminCourseEnrollments;
