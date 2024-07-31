import { columns } from '@/app/dashboard/courses/_components/columns';
import { DataTable } from '@/app/dashboard/courses/_components/data-table';
import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import { getCourses } from '@/queries/courses';

export const dynamic = 'force-dynamic';

// items
const items = [
    {
        label: 'Dashboard',
        href: '/admin/dashboard'
    },
    {
        label: 'Courses',
        current: true
    }
];

const AdminCoursesPage = async () => {
    const courses = await getCourses();
    const modifiedCourses = courses.map((course) => {
        return {
            ...course,
            admin: true
        };
    });

    return (
        <>
            <BreadcrumbSection items={items} />
            <div className='px-6 py-3'>
                <DataTable columns={columns} data={modifiedCourses} isAdmin={true} />
            </div>
        </>
    );
};

export default AdminCoursesPage;
