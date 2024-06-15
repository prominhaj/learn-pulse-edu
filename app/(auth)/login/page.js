import LoginForm from './_components/login-form';

const LoginPage = ({ searchParams: { redirectUrl } }) => {
    return (
        <>
            <LoginForm redirectUrl={redirectUrl} />
        </>
    );
};
export default LoginPage;
