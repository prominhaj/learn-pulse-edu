import { Skeleton } from '@/components/ui/skeleton';

const CourseDetailsLessonLoading = () => {
    return (
        <div className='container px-3 pt-5 pb-10 md:px-8 animate-pulse'>
            <div className='grid grid-cols-1 gap-5 md:gap-8 lg:grid-cols-6'>
                <main className='lg:col-span-4'>
                    <Skeleton className='h-[17rem] sm:h-[20rem] md:h-[25rem] lg:h-[30.625rem] rounded' />
                    <div className='flex items-center gap-3 my-3'>
                        <Skeleton className='w-full h-8 rounded' />
                        <div className='flex items-center gap-3'>
                            <Skeleton className='w-24 h-8 rounded' />
                            <Skeleton className='w-24 h-8 rounded' />
                        </div>
                    </div>
                </main>
                <div className='inset-y-0 z-30 border lg:col-span-2 bg-background'>
                    <div className='flex flex-col p-3 border-b sm:p-6'>
                        <Skeleton className='w-1/3 h-4 rounded' />
                        <Skeleton className='w-full h-3 mt-2 rounded' />
                    </div>
                    <div className='h-[18rem] md:h-[24rem] mt-2 sm:px-6 px-3 space-y-3'>
                        <Skeleton className='h-12 rounded' />
                        <Skeleton className='h-12 rounded' />
                        <Skeleton className='h-12 rounded' />
                        <Skeleton className='h-12 rounded' />
                    </div>
                    <div className='px-3 py-3 space-y-3 sm:px-6'>
                        <Skeleton className='rounded h-9' />
                        <Skeleton className='mt-2 rounded h-9' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsLessonLoading;
