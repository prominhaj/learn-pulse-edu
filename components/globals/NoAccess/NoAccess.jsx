import Link from "next/link";

const NoAccess = () => {
    return (
        <div className="flex md:h-[85vh] flex-col items-center justify-center px-4 py-20 bg-background sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto text-center">
                <LockIcon className="w-12 h-12 mx-auto text-primary" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Access Denied</h1>
                <p className="mt-4 text-muted-foreground">
                    You do not have permission to access this page. Please contact an administrator if you believe this is an
                    error.
                </p>
                <div className="mt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        prefetch={false}
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

const LockIcon = (props) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    )
}

export default NoAccess;