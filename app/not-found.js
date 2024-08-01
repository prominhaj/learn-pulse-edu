import Link from 'next/link';

const MainNotFoundPage = () => {
    return (
        <div>
            <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center relative isolate'>
                <div
                    aria-hidden='true'
                    className='absolute inset-x-0 overflow-hidden pointer-events-none -top-40 -z-10 transform-gpu blur-3xl sm:-top-80'
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                        }}
                        className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:bg-gray-700'
                    />
                </div>
            </div>
            <div className='flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
                <div className='max-w-md mx-auto text-center'>
                    <div className='w-12 h-12 mx-auto text-primary' />
                    <h1 className='mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
                        Oops, page not found!
                    </h1>
                    <p className='mt-4 text-muted-foreground'>
                        The page you are looking for does not exist. Check the URL or go back to the
                        homepage.
                    </p>
                    <div className='mt-6'>
                        <Link
                            href='/'
                            className='inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md shadow-sm bg-primary text-primary-foreground hover:bg-primary/90'
                            prefetch={false}
                        >
                            Go to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainNotFoundPage;
