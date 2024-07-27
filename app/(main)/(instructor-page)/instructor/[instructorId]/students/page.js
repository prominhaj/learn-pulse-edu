import { getInstructorEnrollCourses } from '@/queries/instructor';
import StudentCard from '../../../_components/StudentCard/StudentCard';

const InstructorStudents = async ({ params: { instructorId } }) => {
    const students = await getInstructorEnrollCourses(instructorId);

    const studentIndex = Math.ceil(students.length / 3);

    const chunkedStudents = Array.from({ length: 3 }, (_, index) =>
        students.slice(index * studentIndex, index * studentIndex + studentIndex)
    );

    return (
        <>
            <div className='transition-all duration-500 ease-in-out bg-background'>
                <h5 className='mb-5 text-lg font-semibold text-gray-800 dark:text-gray-200'>
                    Instructor Students
                </h5>

                {students?.length > 0 ? (
                    <div className='grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3'>
                        {chunkedStudents.map((students, index) => (
                            <div key={index} className='space-y-6'>
                                {students.map((student) => (
                                    <StudentCard key={student?.id} student={student} />
                                ))}
                            </div>
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
