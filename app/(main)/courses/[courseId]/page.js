import { getCourseDetails } from '@/queries/courses';
import CourseInfo from './_components/CourseInfo/CourseInfo';
import CourseDetails from './_components/CourseDetails/CourseDetails';
import Testimonials from './_components/Testimonials/Testimonials';
import { replaceMongoIdInArray } from '@/lib/convertData';
import RelatedCourse from './_components/RelatedCourse/RelatedCourse';

// Generate MetaData
export const generateMetadata = async ({ params: { courseId } }) => {
    const course = await getCourseDetails(courseId);

    return {
        title: `${course?.title} - Learn Pulse Edu`,
        description: course?.description,
        openGraph: {
            images: [course?.thumbnail?.url]
        }
    };
};

const SingleCoursePage = async ({ params: { courseId } }) => {
    const course = await getCourseDetails(courseId);
    const isTestimonial = course.testimonials ? true : false;

    return (
        <>
            <CourseInfo course={course} />

            {/* Overview */}
            <CourseDetails course={course} />

            {/* Testimonials */}
            {isTestimonial && (
                <Testimonials testimonials={replaceMongoIdInArray(course?.testimonials)} />
            )}

            {/* Related Course */}
            <RelatedCourse />
        </>
    );
};
export default SingleCoursePage;
