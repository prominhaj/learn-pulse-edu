import { getCoursesByInstructorId } from '@/queries/courses';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { getUserData } from '@/lib/getUserData';
import { cookies } from 'next/headers';
import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';

// items
const items = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Courses',
        current: true
    }
];

const CoursesPage = async () => {
    cookies();

    const user = await getUserData();
    const courses = await getCoursesByInstructorId(user?.id);

    return (
        <>
            <BreadcrumbSection items={items} />
            <div className='px-6 py-3'>
                <DataTable columns={columns} data={courses} />
            </div>
        </>
    );
};

export default CoursesPage;
