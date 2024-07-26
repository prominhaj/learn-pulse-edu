import { replaceMongoIdInArray } from '@/lib/convertData';
import Course from '@/modals/courses-modal';
import Enrollment from '@/modals/enrollment-model';
import User from '@/modals/users-modal';

export const getAllInstructors = async () => {
    try {
        const instructors = await User.find({
            role: 'Teacher'
        })
            .select('-password')
            .lean();
        return replaceMongoIdInArray(instructors);
    } catch (error) {
        throw new Error(error);
    }
};

export const getTopsInstructors = async () => {
    try {
        const instructors = await getAllInstructors();

        const instructorsWithCourseCount = await Promise.all(
            instructors.map(async (instructor) => {
                const totalCourses = await Course.countDocuments({
                    instructor: instructor.id
                });
                return {
                    ...instructor,
                    totalCourses
                };
            })
        );

        // Sort instructors by totalCourses in descending order
        instructorsWithCourseCount.sort((a, b) => b.totalCourses - a.totalCourses);
        const topInstructors = instructorsWithCourseCount.slice(0, 6);

        return topInstructors;
    } catch (error) {
        throw new Error(error);
    }
};

export const getInstructorReports = async (instructorId) => {
    try {
        const courses = await Course.find({
            instructor: instructorId
        }).lean();

        const enrollments = await Promise.all(
            courses.map(async (course) => {
                const enrollments = await Enrollment.countDocuments({
                    course_id: course._id
                });
                return {
                    course_id: course._id,
                    course_name: course.title,
                    enrollments
                };
            })
        );

        return {
            totalCourses: courses.length,
            totalEnrollments: enrollments.reduce((acc, course) => acc + course.enrollments, 0)
        };
    } catch (error) {
        throw new Error(error);
    }
};
