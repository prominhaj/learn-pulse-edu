import { Skeleton } from '@/components/ui/skeleton';
import InstructorCardLoading from './_components/InstructorCard/InstructorCardLoading';

const InstructorLoadingPage = () => {
    return (
        <div className='container py-8 space-y-6 md:pt-8 md:pb-12 lg:pt-12'>
            <div className='flex items-center justify-between'>
                <Skeleton className='w-1/4 h-8 rounded' />
                <Skeleton className='flex items-center w-1/6 h-6 gap-1 rounded' />
            </div>
            <div className='grid grid-cols-1 gap-5 py-4 md:grid-cols-2 lg:grid-cols-3'>
                <InstructorCardLoading />
                <InstructorCardLoading />
                <InstructorCardLoading />
                <InstructorCardLoading />
                <InstructorCardLoading />
                <InstructorCardLoading />
            </div>
        </div>
    );
};

export default InstructorLoadingPage;
