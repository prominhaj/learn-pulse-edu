import { getUserData } from '@/lib/getUserData';
import ApplyInstructorForm from '../_components/Form/ApplyInstructorForm';
import { cookies } from 'next/headers';

const ApplyInstructor = async () => {
    cookies();
    const user = await getUserData();

    return (
        <div className='p-3 transition-all duration-500 ease-in-out border rounded-md md:p-5 bg-background'>
            <h2 className='text-xl font-semibold tracking-wider text-center'>Apply Instructor</h2>
            <div className='pt-5'>
                {user?.role !== 'Teacher' ? (
                    <ApplyInstructorForm user={user} />
                ) : (
                    <p className='text-center text-muted-foreground'>
                        You have already been Instructor
                    </p>
                )}
            </div>
        </div>
    );
};

export default ApplyInstructor;
