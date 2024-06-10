import LoginForm from './_components/login-form';

const LoginPage = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full h-screen'>
            <div className='container'>
                <div
                    aria-hidden='true'
                    className='absolute inset-x-0 overflow-hidden pointer-events-none -top-40 -z-10 transform-gpu blur-3xl sm:-top-80'
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                        }}
                        className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#34d399] via-[#60a5fa] to-[#f472b6] opacity-30 backdrop-blur-lg sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:bg-gray-800'
                    />
                </div>

                <LoginForm />
            </div>
        </div>
    );
};
export default LoginPage;
