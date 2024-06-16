import { getTestimonialsForCourse } from '@/queries/testimonials';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { getCourseByCourseId } from '@/queries/courses';

const ReviewsPage = async ({ params: { courseId } }) => {
    const reviews = await getTestimonialsForCourse(courseId);
    const course = await getCourseByCourseId(courseId);

    // Filter reviews
    const filterReviews = reviews?.map((review) => {
        return {
            id: review.id,
            studentName: `${review.userId.firstName} ${review.userId.lastName}`,
            studentEmail: review.userId.email,
            rating: review.rating,
            content: review.content
        };
    });

    return (
        <div className='p-6'>
            <h2>{course?.title}</h2>
            <DataTable columns={columns} data={filterReviews} />
        </div>
    );
};

export default ReviewsPage;
