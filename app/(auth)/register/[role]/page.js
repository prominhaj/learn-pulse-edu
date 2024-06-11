import { notFound } from 'next/navigation';
import SignupForm from '../_components/signup-form';

const RegisterPage = ({ params: { role } }) => {
    if (role === 'student' || role === 'instructor') {
        return (
            <>
                <SignupForm role={role} />
            </>
        );
    }
    notFound();
};
export default RegisterPage;
