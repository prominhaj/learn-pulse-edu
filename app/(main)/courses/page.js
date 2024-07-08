import CourseFilterSection from './_components/CourseFilterSecton/CourseFilterSection';
import { coursesByFilter } from '@/queries/courses';
import CourseCard from '@/components/globals/CourseCard/CourseCard';

// Metadata
export const metadata = {
    title: 'Courses - Learn Pulse Edu',
    description: 'Explore || Learn || Build || Share || Courses'
};

const CoursesPage = async () => {
    const courses = await coursesByFilter();

    return (
        <section id='courses' className='container py-6 space-y-6 dark:bg-transparent'>
            <h2 className='text-xl font-medium md:text-2xl'>All Courses</h2>

            <CourseFilterSection>
                <div className='grid gap-4 lg:col-span-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
                    {courses.map((course) => (
                        <CourseCard key={course?.id} course={course} />
                    ))}
                </div>
            </CourseFilterSection>
        </section>
    );
};
export default CoursesPage;
