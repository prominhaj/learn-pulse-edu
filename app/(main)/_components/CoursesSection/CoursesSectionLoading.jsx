import CourseCardLoading from "@/components/globals/CourseCard/CourseCardLoading";
import { Skeleton } from "@/components/ui/skeleton";

const CoursesSectionLoading = () => {
    return (
        <section className='container py-8 space-y-6 md:pt-8 md:pb-12 lg:pb-16 lg:pt-12'>
            <div className='flex items-center justify-between'>
                <Skeleton className='w-1/4 h-6 rounded' />
                <Skeleton className='w-1/6 h-4 rounded' />
            </div>
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4'>
                <CourseCardLoading />
                <CourseCardLoading />
                <CourseCardLoading />
                <CourseCardLoading />
                <CourseCardLoading />
                <CourseCardLoading />
                <CourseCardLoading />
                <CourseCardLoading />
            </div>
        </section>
    );
};

export default CoursesSectionLoading;