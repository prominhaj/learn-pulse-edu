import CourseCardLoading from '@/components/globals/CourseCard/CourseCardLoading';
import { Skeleton } from '@/components/ui/skeleton';

const InstructorCoursesPageLoading = () => {
    return (
        <div className='p-3 transition-all duration-200 border rounded-md md:p-5 bg-background'>
            <Skeleton className='w-1/4 h-6 mb-5 rounded' />
            <div className='grid items-center grid-cols-1 gap-5 md:grid-cols-2'>
                <CourseCardLoading />
                <CourseCardLoading />
                <CourseCardLoading />
                <CourseCardLoading />
            </div>
        </div>
    );
};

export default InstructorCoursesPageLoading;
