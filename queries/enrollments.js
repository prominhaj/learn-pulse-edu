import { replaceMongoIdInArray } from '@/lib/convertData';
import Category from '@/modals/categories-modal';
import Course from '@/modals/courses-modal';
import { Enrollment } from '@/modals/enrollment-model';

export const getEnrollmentsForCourse = async (courseId) => {
    const enrollments = await Enrollment.find({ course_id: courseId }).lean();
    return replaceMongoIdInArray(enrollments);
};

export const getEnrollmentsForUser = async (userId) => {
    try {
        const enrollments = await Enrollment.find({ user_id: userId })
            .populate({
                path: 'course_id',
                model: Course
            })
            .lean();
        return replaceMongoIdInArray(enrollments);
    } catch (error) {
        throw new Error(error);
    }
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
