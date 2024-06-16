import { replaceMongoIdInArray } from '@/lib/convertData';
import Testimonial from '@/modals/testimonials-modal';
import User from '@/modals/users-modal';

export const getTestimonialsForCourse = async (courseId) => {
    const testimonials = await Testimonial.find({ courseId })
        .populate({
            path: 'userId',
            model: User,
            select: '-password'
        })
        .lean();
    return replaceMongoIdInArray(testimonials);
};
