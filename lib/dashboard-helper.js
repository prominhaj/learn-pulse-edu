import { getCourseByCourseId } from '@/queries/courses';
import { getAReport } from '@/queries/reports';
import { getUserByUserId } from '@/queries/users';
import { getCoursesByInstructorId } from '@/queries/courses';
import {
    getEnrollmentsForCourse,
    getMonthEnrollmentsSell,
    getRecentEnrollments
} from '@/queries/enrollments';

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
                const quizzesTaken = quizzes?.filter((q) => q.attempted);
                const totalCorrect = quizzesTaken
                    ?.map((quiz) => {
                        const item = quiz.options;
                        return item.filter((o) => {
                            return o.isCorrect === true && o.isSelected === true;
                        });
                    })
                    .filter((elem) => elem.length > 0)
                    .flat();
                const marksFromQuizzes = totalCorrect?.length * 5;
                enrollment['quizMark'] = marksFromQuizzes;
            }
            return enrollment;
        })
    );

    return populatedEnrollments;
};

export const fetchDashboardData = async (userId) => {
    try {
        const courses = await getCoursesByInstructorId(userId);

        // Use Promise.all to fetch enrollments concurrently
        const enrollCourse = await Promise.all(
            courses.map(async (course) => {
                const enrollments = await getEnrollmentsForCourse(course.id);
                return {
                    enrollments: enrollments.length,
                    totalPrice: course.price * enrollments.length
                };
            })
        );

        // Reduce enrollCourse in a single pass
        const { totalEnroll, totalSalePrice } = enrollCourse.reduce(
            (acc, { enrollments, totalPrice }) => {
                acc.totalEnroll += enrollments;
                acc.totalSalePrice += totalPrice;
                return acc;
            },
            { totalEnroll: 0, totalSalePrice: 0 }
        );

        const [enrollByInstructorReports, recentEnrollments] = await Promise.all([
            getMonthEnrollmentsSell(userId),
            getRecentEnrollments(userId)
        ]);

        return {
            courses,
            totalEnroll,
            totalSalePrice,
            enrollByInstructorReports,
            recentEnrollments
        };
    } catch (error) {
        throw new Error(`Failed to fetch dashboard data: ${error.message}`);
    }
};
