import Link from "next/link";

const CourseNotFound = () => {
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto text-center">
                <BookIcon className="w-12 h-12 mx-auto text-primary" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Course Not Found</h1>
                <p className="mt-4 text-muted-foreground">
                    Oops, it looks like the course you re looking for does not exist. Do not worry, you can explore our other
                    courses and find something that suits your interests.
                </p>
                <div className="mt-6">
                    <Link
                        href="/courses"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md shadow-sm bg-primary text-primary-foreground hover:bg-primary/90"
                        prefetch={false}
                    >
                        Go to Courses
                    </Link>
                </div>
            </div>
        </div>
    );
};

const BookIcon = (props) => {
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
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
    )
}

export default CourseNotFound;