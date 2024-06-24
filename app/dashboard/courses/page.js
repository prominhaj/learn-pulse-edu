import { unstable_noStore as noStore } from 'next/cache';
import { getCoursesByInstructorId } from '@/queries/courses';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { getUserData } from '@/lib/getUserData';

const CoursesPage = async () => {
    noStore();
    const user = await getUserData();
    const courses = await getCoursesByInstructorId(user?.id);

    return (
        <div className='p-6'>
            <DataTable columns={columns} data={courses} />
        </div>
    );
};

export default CoursesPage;
