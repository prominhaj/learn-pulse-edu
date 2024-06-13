import { replaceMongoIdInArray } from '@/lib/convertData';
import { Enrollment } from '@/modals/enrollment-model';

export const getEnrollmentsForCourse = async (courseId) => {
    const enrollments = await Enrollment.find({ course_id: courseId }).lean();
    return replaceMongoIdInArray(enrollments);
};

export const enrollForCourse = async (enrollData) => {
    try {
        // Get the enrollments
        const existingEnrollment = await Enrollment.findOne({
            course_id: enrollData.course_id,
            user_id: enrollData.user_id
        }).lean();

        // Check if the user is already enrolled in the course
        if (!existingEnrollment) {
            await Enrollment.create(enrollData);
            return {
                success: true,
                message: 'Enrolled successfully'
            };
        }
    } catch (error) {
        throw new Error(error);
    }
};
