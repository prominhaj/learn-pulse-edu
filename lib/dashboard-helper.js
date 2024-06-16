const { getCourseByCourseId } = require('@/queries/courses');
const { getAReport } = require('@/queries/reports');
const { getUserByUserId } = require('@/queries/users');

export const populateEnrollmentData = async (enrollments) => {
    const populatedEnrollments = await Promise.all(
        enrollments.map(async (enrollment) => {
            // Update Student Information
            const student = await getUserByUserId(enrollment?.user_id?._id);
            enrollment['studentName'] = `${student?.firstName} ${student?.lastName}`;
            enrollment['studentEmail'] = student?.email;

            // Update Quiz and Progress Info
            const filter = {
                course: enrollment?.course?._id,
                student: enrollment?.student?._id
            };
            const report = await getAReport(filter);

            enrollment['progress'] = 0;
            enrollment['quizMark'] = 0;

            if (report) {
                // Calculate progress
                const course = await getCourseByCourseId(enrollment?.course_id);
                const totalModules = course?.modules?.length;
                if (totalModules) {
                    const totalCompletedModules = report?.total_completed_modules || 0;
                    const progress = (totalCompletedModules / totalModules) * 100;
                    enrollment['progress'] = progress;
                }

                // Calculate Quiz Marks
                const quizzes = report?.quizAssessment?.assessments;
                const quizzesTaken = quizzes.filter((q) => q.attempted);
                const totalCorrect = quizzesTaken
                    ?.map((quiz) => {
                        const item = quiz.options;
                        return item.filter((o) => {
                            return o.isCorrect === true && o.isSelected === true;
                        });
                    })
                    .filter((elem) => elem.length > 0)
                    .flat();
                const marksFromQuizzes = totalCorrect.length * 5;
                enrollment['quizMark'] = marksFromQuizzes;
            }
            return enrollment;
        })
    );

    return populatedEnrollments;
};
