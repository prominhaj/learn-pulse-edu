import CourseCardLoading from '@/components/globals/CourseCard/CourseCardLoading';

const CoursesSectionLoading = () => {
    return (
        <div className='container pb-8 space-y-6 md:pb-12 lg:pb-16'>
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4'>
                {Array.from({ length: 8 }).map((_, index) => (
                    <CourseCardLoading key={index} />
                ))}
            </div>
        </div>
    );
};

export default CoursesSectionLoading;
