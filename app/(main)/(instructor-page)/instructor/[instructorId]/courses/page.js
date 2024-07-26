import CourseCard from '@/components/globals/CourseCard/CourseCard';
import { getCoursesByInstructorId } from '@/queries/courses';

const InstructorCourses = async ({ params: { instructorId } }) => {
    const courses = await getCoursesByInstructorId(instructorId);

    return (
        <>
            <div className='p-3 transition-all duration-500 ease-in-out border rounded-md md:p-5 bg-background'>
                <h5 className='mb-5 text-lg font-semibold text-gray-800 dark:text-gray-200'>
                    Instructor Courses
                </h5>
                {courses.length > 0 ? (
                    <div className='grid items-center grid-cols-1 gap-5 md:grid-cols-2'>
                        {courses?.map((course) => (
                            <CourseCard key={course?.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <p className='text-center text-muted-foreground'>
                        No courses found for this instructor.
                    </p>
                )}
            </div>
        </>
    );
};

export default InstructorCourses;
