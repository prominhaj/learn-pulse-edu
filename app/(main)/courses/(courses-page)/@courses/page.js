import CourseCard from '@/components/globals/CourseCard/CourseCard';
import CoursePagination from '@/components/globals/Pagination/Pagination';
import { coursesByFilter, getTotalCourse } from '@/queries/courses';

export const dynamic = 'force-dynamic';

const CoursesSectionPage = async ({ searchParams: { s, categories, price, sort, page } }) => {
    const totalCourse = await getTotalCourse();
    const courses = await coursesByFilter({
        search: s,
        categories: categories?.split(',') || '',
        price,
        sort: sort === 'price-asc' ? 'asc' : 'desc',
        page: parseInt(page) || 1,
        perPage: 6
    });
    const totalPage = Math.round(totalCourse / 6);

    return (
        <>
            {courses?.length > 0 ? (
                <div>
                    <div className='grid gap-4 pb-3 lg:col-span-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
                        {courses?.map((course) => (
                            <CourseCard key={course?.id} course={course} />
                        ))}
                    </div>
                    <CoursePagination currentPage={parseInt(page) || 1} totalPages={totalPage} />
                </div>
            ) : (
                <div className='py-10 text-center'>
                    <h2 className='mb-1 text-2xl'>No courses found</h2>
                    <p>Please try a different search or filter options.</p>
                </div>
            )}
        </>
    );
};

export default CoursesSectionPage;
