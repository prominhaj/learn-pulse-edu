import { Skeleton } from '@/components/ui/skeleton';

const CoursesDetailsPageLoading = () => {
    return (
        <div className='overflow-x-hidden'>
            <section className='py-12 sm:py-16'>
                <div className='container'>
                    <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                        <div className='flex flex-col items-center max-w-2xl mx-auto'>
                            <Skeleton className='w-1/2 h-6 px-6 rounded' />
                            <Skeleton className='w-3/4 h-12 mt-5 rounded' />
                        </div>
                    </div>
                    <div
                        aria-hidden='true'
                        className='absolute inset-x-0 overflow-hidden pointer-events-none -top-16 -z-10'
                    ></div>
                    <div className='mt-6'>
                        <div className='relative'>
                            <div className='absolute inset-0 h-2/3'></div>
                            <div className='relative mx-auto lg:max-w-3xl'>
                                <Skeleton className='w-full rounded-lg h-[25rem]' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap items-center justify-center gap-3 mt-6'>
                        <Skeleton className='h-10 rounded w-36' />
                        <Skeleton className='h-10 rounded w-36' />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CoursesDetailsPageLoading;
