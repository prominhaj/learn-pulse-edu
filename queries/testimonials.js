import { replaceMongoIdInArray } from '@/lib/convertData';
import Testimonial from '@/modals/testimonials-modal';

export const getTestimonialsForCourse = async (courseId) => {
    const testimonials = await Testimonial.find({ courseId: courseId }).lean();
    return replaceMongoIdInArray(testimonials);
};
