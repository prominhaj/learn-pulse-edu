import { getUserData } from '@/lib/getUserData';
import ApplyInstructorForm from '../_components/Form/ApplyInstructorForm';
import { cookies } from 'next/headers';
import { CircleCheck, Clock9 } from 'lucide-react';

const ApplyInstructor = async () => {
    cookies();
    const user = await getUserData();

    const renderMessage = (Icon, message) => (
        <p className='flex items-center justify-center gap-2 text-muted-foreground'>
            {Icon && <Icon className='w-5 h-5 p-0 text-white bg-green-500 rounded-full' />}
            {message}
        </p>
    );

    const renderContent = () => {
        if (!user) {
            return renderMessage(null, 'User data could not be retrieved.');
        }

        switch (user.role) {
            case 'Admin':
                return renderMessage(
                    null,
                    'Only Admins can apply as Instructors. Please contact a Teacher or Admin for this purpose.'
                );
            case 'Student':
                return <ApplyInstructorForm user={user} />;
            case 'Pending':
                return renderMessage(
                    Clock9,
                    'Your application is being reviewed. Please wait for a response.'
                );
            case 'Teacher':
                return renderMessage(CircleCheck, 'You have already been Instructor.');
            default:
                return renderMessage(null, 'Your role is not recognized.');
        }
    };

    return (
        <div className='p-3 transition-all duration-500 ease-in-out border rounded-md md:p-5 bg-background'>
            <h2 className='text-xl font-semibold tracking-wider text-center'>Apply Instructor</h2>
            <div className='pt-5'>{renderContent()}</div>
        </div>
    );
};

export default ApplyInstructor;
