import { replaceMongoIdInArray } from '@/lib/convertData';
import Course from '@/modals/courses-modal';
import Enrollment from '@/modals/enrollment-model';
import mongoose from 'mongoose';

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

export const getMonthEnrollmentsSell = async (instructorId) => {
    try {
        // Convert instructorId to ObjectId
        const instructorObjectId = new mongoose.Types.ObjectId(instructorId);

        // Get the current year
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

        const aggregationResult = await Enrollment.aggregate([
            {
                $match: {
                    status: 'complete',
                    enrollment_date: {
                        $gte: startOfYear,
                        $lte: endOfYear
                    }
                }
            },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'course_id',
                    foreignField: '_id',
                    as: 'course'
                }
            },
            {
                $unwind: '$course'
            },
            {
                $match: {
                    'course.instructor': instructorObjectId
                }
            },
            {
                $group: {
                    _id: { month: { $month: '$enrollment_date' } },
                    totalEnrollments: { $sum: 1 },
                    totalSales: { $sum: '$course.price' }
                }
            },
            {
                $sort: { '_id.month': 1 }
            }
        ]);

        // Define month names
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];

        // Initialize an array with all months and zero totals
        const reportData = monthNames.map((month) => ({
            name: month,
            total: 0
        }));

        // Map aggregation results to report format
        aggregationResult.forEach((item) => {
            reportData[item._id.month - 1].total = item.totalSales;
        });

        return reportData;
    } catch (error) {
        throw new Error(error);
    }
};
