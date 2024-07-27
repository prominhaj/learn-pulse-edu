import { Skeleton } from '@/components/ui/skeleton';
import StudentCardLoading from '../../../_components/StudentCard/StudentCardLoading';

const InstructorStudentsLoadingPage = () => {
    return (
        <div className='transition-all duration-500 ease-in-out bg-background'>
            <Skeleton className='w-1/4 h-6 mb-5 rounded' />
            <div className='grid items-start grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3'>
                <StudentCardLoading />
                <StudentCardLoading />
                <StudentCardLoading />
                <StudentCardLoading />
                <StudentCardLoading />
                <StudentCardLoading />
            </div>
        </div>
    );
};

export default InstructorStudentsLoadingPage;
