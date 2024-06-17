import { getCourseDetails } from '@/queries/courses';
import CourseInfo from './_components/CourseInfo/CourseInfo';
import CourseDetails from './_components/CourseDetails/CourseDetails';
import Testimonials from './_components/Testimonials/Testimonials';
import { replaceMongoIdInArray } from '@/lib/convertData';
import RelatedCourse from './_components/RelatedCourse/RelatedCourse';
import { hasEnrollmentForCourse } from '@/queries/enrollments';
import { getUserData } from '@/lib/getUserData';

// Generate MetaData
export const generateMetadata = async ({ params: { courseId } }) => {
    const { course } = await getCourseDetails(courseId);

    return {
        title: `${course?.title} - Learn Pulse Edu`,
        description: course?.description,
        openGraph: {
            images: [course?.thumbnail?.url]
        }
    };
};

const SingleCoursePage = async ({ params: { courseId } }) => {
    const { course, relatedCourses } = await getCourseDetails(courseId);
    const user = await getUserData();
    const alreadyEnrolledCourse = await hasEnrollmentForCourse(courseId, user?.id);

    return (
        <>
            <CourseInfo alreadyEnrolledCourse={alreadyEnrolledCourse} course={course} />

            {/* Overview */}
            <CourseDetails course={course} />

            {/* Testimonials */}
            {course?.testimonials && (
                <Testimonials testimonials={replaceMongoIdInArray(course?.testimonials)} />
            )}

            {/* Related Course */}
            <RelatedCourse relatedCourses={relatedCourses} />
        </>
    );
};
export default SingleCoursePage;
