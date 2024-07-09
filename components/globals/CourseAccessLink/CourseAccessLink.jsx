import { getFindCourseFastLesson } from '@/lib/course';
import { formAccessCourse } from '@/app/actions';
import CourseAccessButton from './CourseAccessButton';

const CourseAccessLink = async ({ courseId, variant, size, className }) => {
    const fastLesson = await getFindCourseFastLesson(courseId) || {};
    const formatLessonId = fastLesson?._id?.toString() || "";

    const handleAccessCourse = async () => {
        "use server"
        await formAccessCourse(courseId, formatLessonId)

    };

    return (
        <>
            <form action={handleAccessCourse}>
                <CourseAccessButton
                    variant={variant}
                    size={size}
                    className={className}
                />
            </form>
        </>
    );
};

export default CourseAccessLink;