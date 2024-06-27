import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { getFindCourseFastLesson } from '@/lib/course';

const CourseAccessLink = async ({ courseId, variant, size, className }) => {
    const fastLesson = await getFindCourseFastLesson(courseId);
    const formatLesson = fastLesson?.slug.replace(/0/g, "-");

    return (
        <Link
            href={`/courses/${courseId.toString()}/lesson/${formatLesson}`}
            className={cn(buttonVariants({ variant: variant ?? "default", size: size }), "w-full", className)}
        >
            Access Now
        </Link>
    );
};

export default CourseAccessLink;