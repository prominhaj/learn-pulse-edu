import { Skeleton } from '@/components/ui/skeleton';
import StudentCardLoading from '../../../_components/StudentCard/StudentCardLoading';

const InstructorStudentsLoadingPage = () => {
    return (
        <div className='p-3 transition-all duration-200 border rounded-md md:p-5 bg-background'>
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
