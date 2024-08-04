import { getUserData } from '@/lib/getUserData';
import ApplyInstructorForm from '../_components/Form/ApplyInstructorForm';
import { cookies } from 'next/headers';
import { CircleCheck, Clock9 } from 'lucide-react';

const ApplyInstructor = async () => {
    cookies();
    const user = await getUserData();

    return (
        <div className='p-3 transition-all duration-500 ease-in-out border rounded-md md:p-5 bg-background'>
            <h2 className='text-xl font-semibold tracking-wider text-center'>Apply Instructor</h2>
            <div className='pt-5'>
                {user?.role === 'Admin' && (
                    <div>
                        <p className='text-center text-muted-foreground'>
                            Only Admins can apply as Instructors. Please contact a Teacher or Admin
                            for this purpose.
                        </p>
                    </div>
                )}{' '}
                {user?.role === 'Student' && <ApplyInstructorForm user={user} />}
                {user?.role === 'Pending' && (
                    <>
                        <p className='flex items-center justify-center gap-2 text-muted-foreground'>
                            <Clock9 className='w-5 h-5 p-0 text-white bg-green-500 rounded-full' />{' '}
                            Your application is being reviewed. Please wait for a response.
                        </p>
                    </>
                )}
                {user?.role === 'Teacher' && (
                    <p className='flex items-center justify-center gap-2 text-muted-foreground'>
                        <CircleCheck className='w-5 h-5 p-0 text-white bg-green-500 rounded-full' />{' '}
                        You have already been Instructor
                    </p>
                )}
            </div>
        </div>
    );
};

export default ApplyInstructor;
