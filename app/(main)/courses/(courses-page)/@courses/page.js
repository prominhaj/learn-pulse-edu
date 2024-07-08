import CourseCard from '@/components/globals/CourseCard/CourseCard';
import { coursesByFilter } from '@/queries/courses';

const CoursesSection = async ({ searchParams: { s, categories, price, sort } }) => {
    const formatCategories = categories?.split(',') || '';
    console.log(formatCategories);
    const courses = await coursesByFilter();
    console.log(s, categories, price, sort);

    return (
        <div className='grid gap-4 lg:col-span-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {courses.map((course) => (
                <CourseCard key={course?.id} course={course} />
            ))}
        </div>
    );
};

export default CoursesSection;
