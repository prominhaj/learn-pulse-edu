import { replaceMongoIdInArray, replaceMongoIdInObject } from '@/lib/convertData';
import Category from '@/modals/categories-modal';
import Course from '@/modals/courses-modal';
import { Lesson } from '@/modals/lessons-modal';
import Module from '@/modals/modules-modal';
import Testimonial from '@/modals/testimonials-modal';
import User from '@/modals/users-modal';
import { getTestimonialsForCourse } from './testimonials';
import { getEnrollmentsForCourse } from './enrollments';

export const getCourses = async () => {
    const courses = await Course.find({})
        .select(['title', 'subtitle', 'thumbnail', 'modules', 'price', 'category'])
        .populate({
            path: 'category',
            model: Category
        })
        .populate({
            path: 'modules',
            model: Module
        })
        .lean();
    return replaceMongoIdInArray(courses);
};

export const getCourseDetails = async (id) => {
    const course = await Course.findById(id)
        .populate({
            path: 'category',
            model: Category
        })
        .populate({
            path: 'instructor',
            model: User
        })
        .populate({
            path: 'testimonials',
            model: Testimonial,
            populate: {
                path: 'userId',
                model: User
            }
        })
        .populate({
            path: 'modules',
            model: Module,
            populate: {
                path: 'lessonIds',
                model: Lesson
            }
        })
        .lean();

    const relatedCourse = await Course.find({
        category: course.category._id,
        _id: { $ne: id }
    }).lean();

    return {
        course: replaceMongoIdInObject(course),
        relatedCourses: replaceMongoIdInArray(relatedCourse)
    };
};

export const getCourseDetailsByInstructor = async (instructorId) => {
    // Fetch all courses by instructor in one query
    const courses = await Course.find({ instructor: instructorId }).lean();

    if (courses.length === 0) {
        return {
            courses: 0,
            enrollments: 0,
            reviews: 0,
            ratings: 0
        };
    }

    // Extract course IDs for batch processing
    const courseIds = courses.map((course) => course._id.toString());

    // Fetch all enrollments and testimonials in parallel
    const [enrollments, testimonials] = await Promise.all([
        Promise.all(courseIds.map((courseId) => getEnrollmentsForCourse(courseId))),
        Promise.all(courseIds.map((courseId) => getTestimonialsForCourse(courseId)))
    ]);

    // Flatten the enrollments and testimonials arrays
    const totalEnrollments = enrollments.flat().length;
    const totalTestimonials = testimonials.flat();

    // Calculate average rating
    const avgRating =
        totalTestimonials.reduce((acc, { rating }) => acc + rating, 0) / totalTestimonials.length;

    return {
        courses: courses.length,
        enrollments: totalEnrollments,
        reviews: totalTestimonials.length,
        ratings: totalTestimonials.length > 0 ? avgRating.toPrecision(2) : 0
    };
};

export const getCoursesByInstructorId = async (instructorId) => {
    try {
        const courses = await Course.find({
            instructor: instructorId
        }).lean();
        return replaceMongoIdInArray(courses);
    } catch (error) {
        throw new Error(error);
    }
};

export const getCourseByCourseId = async (courseId) => {
    try {
        const course = await Course.findOne({ _id: courseId }).lean();
        return replaceMongoIdInObject(course);
    } catch (error) {
        throw new Error(error);
    }
};
