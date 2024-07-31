import { replaceMongoIdInArray } from '@/lib/convertData';
import Course from '@/modals/courses-modal';
import Enrollment from '@/modals/enrollment-model';
import User from '@/modals/users-modal';
import mongoose from 'mongoose';

export const getEnrollmentsForCourse = async (courseId) => {
    try {
        const enrollments = await Enrollment.find({ course_id: courseId })
            .populate({
                path: 'user_id',
                model: User,
                select: '-password'
            })
            .lean();
        return replaceMongoIdInArray(enrollments);
    } catch (error) {
        throw new Error(error);
    }
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
        // Convert instructorId to ObjectId if it's provided
        const instructorObjectId = instructorId ? new mongoose.Types.ObjectId(instructorId) : null;

        // Get the current date
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Calculate the date range for the past 12 months
        const startDate = new Date(currentYear, currentMonth - 11, 1);
        const endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59, 999);

        // Create the base aggregation pipeline
        const aggregationPipeline = [
            {
                $match: {
                    status: 'complete',
                    enrollment_date: {
                        $gte: startDate,
                        $lte: endDate
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
            }
        ];

        // Conditionally add the instructor filter if an instructor ID is provided
        if (instructorObjectId) {
            aggregationPipeline.push({
                $match: {
                    'course.instructor': instructorObjectId
                }
            });
        }

        // Add the grouping and sorting stages
        aggregationPipeline.push(
            {
                $group: {
                    _id: {
                        month: { $month: '$enrollment_date' },
                        year: { $year: '$enrollment_date' }
                    },
                    totalEnrollments: { $sum: 1 },
                    totalSales: { $sum: '$course.price' }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        );

        const aggregationResult = await Enrollment.aggregate(aggregationPipeline);

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

        // Initialize report data with past 12 months
        const reportData = Array.from({ length: 12 }, (_, i) => {
            const date = new Date(currentYear, currentMonth - 11 + i, 1);
            return {
                name: monthNames[date.getMonth()],
                total: 0
            };
        });

        // Map aggregation results to report format
        aggregationResult.forEach((item) => {
            const reportItem = reportData.find((rd) => {
                return (
                    rd.name === monthNames[item._id.month - 1] &&
                    new Date(
                        currentYear,
                        currentMonth - 11 + monthNames.indexOf(rd.name)
                    ).getFullYear() === item._id.year
                );
            });
            if (reportItem) {
                reportItem.total = item.totalSales;
            }
        });

        return reportData;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getRecentEnrollments = async (instructorId) => {
    try {
        const enrollments = await Enrollment.find({ status: 'complete' })
            .populate({
                path: 'course_id',
                model: Course,
                populate: {
                    path: 'instructor',
                    model: User
                }
            })
            .populate({
                path: 'user_id',
                model: User
            })
            .sort({ enrollment_date: -1 })
            .limit(8)
            .lean();

        const filterInstructorEnrollCourses = enrollments.filter(
            (enrollment) => enrollment?.course_id?.instructor?._id.toString() === instructorId
        );

        return replaceMongoIdInArray(instructorId ? filterInstructorEnrollCourses : enrollments);
    } catch (error) {
        throw new Error(error);
    }
};

export const hasEnrollmentForCourse = async (courseId, studentId) => {
    try {
        const enrollment = await Enrollment.findOne({
            course_id: courseId,
            user_id: studentId
        })
            .populate({
                path: 'course_id',
                model: Course
            })
            .lean();

        if (!enrollment) return false;

        return true;
    } catch (error) {
        throw new Error(error);
    }
};

export const totalEnrollCourse = async (courseId) => {
    try {
        const totalEnrollmentCourse = await Enrollment.countDocuments({
            course_id: courseId
        });
        return totalEnrollmentCourse;
    } catch (error) {
        throw new Error(error);
    }
};
