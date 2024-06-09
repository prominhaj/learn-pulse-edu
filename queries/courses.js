import { replaceMongoIdInArray, replaceMongoIdInObject } from '@/lib/convertData';
import Category from '@/modals/categories-modal';
import Course from '@/modals/courses-modal';
import Module from '@/modals/modules-modal';
import Testimonial from '@/modals/testimonials-modal';
import User from '@/modals/users-modal';

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
            model: Module
        })
        .lean();

    return replaceMongoIdInObject(course);
};

export const getCourseDetailsByInstructor = async (instructorId) => {
    const courses = await Course.find({ instructor: instructorId }).lean();

    const enrollments = await Promise.all(
        courses.map(async (course) => {
            const enrollment = await getEnrollmentsForCourse(course._id.toString());
            return enrollment;
        })
    );

    const totalEnrollments = enrollments.reduce((item, currentValue) => {
        return item.length + currentValue.length;
    });

    const testimonials = await Promise.all(
        courses.map(async (course) => {
            const testimonial = await getTestimonialsForCourse(course._id.toString());
            return testimonial;
        })
    );

    const totalTestimonials = testimonials.flat();
    const avgRating =
        totalTestimonials.reduce(function (acc, obj) {
            return acc + obj.rating;
        }, 0) / totalTestimonials.length;

    //console.log("testimonials", totalTestimonials, avgRating);

    return {
        courses: courses.length,
        enrollments: totalEnrollments,
        reviews: totalTestimonials.length,
        ratings: avgRating.toPrecision(2)
    };
};
