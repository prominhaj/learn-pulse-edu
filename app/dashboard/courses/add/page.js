import BreadcrumbSection from '@/components/globals/Breadcrumb/BreadcrumbSection';
import CreateCourseForm from './_components/CreateCourseForm';

// MetaData
export const metadata = {
    title: 'Add Course - Learn Pulse Edu',
    description: 'Explore || Learn || Build || Share'
};

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
        label: 'Add',
        current: true
    }
];

const AddCourse = () => {
    return (
        <>
            <BreadcrumbSection items={items} />
            <div className='flex items-center justify-center max-w-5xl p-6 mx-auto mt-10 md:mt-20'>
                <div className='max-w-full w-[33.5rem]'>
                    <CreateCourseForm />
                </div>
            </div>
        </>
    );
};

export default AddCourse;
