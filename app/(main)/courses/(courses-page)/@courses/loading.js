import CourseCardLoading from '@/components/globals/CourseCard/CourseCardLoading';

const loading = () => {
    return (
        <div className='grid gap-4 lg:col-span-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            <CourseCardLoading />
            <CourseCardLoading />
            <CourseCardLoading />
            <CourseCardLoading />
            <CourseCardLoading />
            <CourseCardLoading />
        </div>
    );
};

export default loading;
