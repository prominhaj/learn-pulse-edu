import { getInstructorEnrollCourses } from '@/queries/instructor';
import StudentCard from '../../../_components/StudentCard/StudentCard';

const InstructorStudents = async ({ params: { instructorId } }) => {
    const students = await getInstructorEnrollCourses(instructorId);

    return (
        <>
            <div className='p-3 transition-all duration-500 ease-in-out border rounded-md md:p-5 bg-background'>
                <h5 className='mb-5 text-lg font-semibold text-gray-800 dark:text-gray-200'>
                    Instructor Students
                </h5>
                {students?.length > 0 ? (
                    <div className='grid items-start grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3'>
                        {students?.map((student) => (
                            <StudentCard key={student?.id} student={student} />
                        ))}
                    </div>
                ) : (
                    <p className='text-center text-muted-foreground'>No students enrolled yet.</p>
                )}
            </div>
        </>
    );
};

export default InstructorStudents;
