import Link from "next/link";

const NotFound = ({ name }) => {
    return (
        <div className="flex h-[70vh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto text-center">
                <TriangleAlertIcon className="w-12 h-12 mx-auto text-primary" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{name} Not Found</h1>
                <p className="mt-4 text-muted-foreground">
                    The requested lesson is currently unavailable. Please check back later or contact support for more
                    information.
                </p>
                <div className="mt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md shadow-sm bg-primary text-primary-foreground hover:bg-primary/90"
                        prefetch={false}
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

const TriangleAlertIcon = (props) => {
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
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    )
}

export default NotFound;