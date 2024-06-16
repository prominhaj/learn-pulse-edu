import { getTestimonialsForCourse } from '@/queries/testimonials';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

const reviews = [
    {
        id: 1,
        student: { name: 'John Doe' },
        review: 'Nice Course, Thanks for the help',
        rating: 5
    },
    {
        id: 1,
        student: { name: 'John Smilga' },
        review: 'Nice Course, Thanks for the help',
        rating: 5
    }
];

const ReviewsPage = async ({ params: { courseId } }) => {
    const reviews = await getTestimonialsForCourse(courseId);

    const filterReviews = reviews?.map((review) => {
        return {
            id: review.id,
            studentName: `${review.userId.firstName} ${review.userId.lastName}`,
            studentEmail: review.userId.email,
            rating: review.rating,
            content: review.content
        };
    });

    console.log(filterReviews);
    return (
        <div className='p-6'>
            <h2>Think in a Redux way reviews</h2>
            <DataTable columns={columns} data={filterReviews} />
        </div>
    );
};

export default ReviewsPage;
