'use server';

import Course from '@/modals/courses-modal';
import Testimonial from '@/modals/testimonials-modal';

export const createReview = async (data) => {
    try {
        // Create the testimonial
        const create = await Testimonial.create(data);
        const review = JSON.parse(JSON.stringify(create));

        // Find the course and add the testimonial to it
        const course = await Course.findById(review?.courseId).lean();
        if (!course) {
            throw new Error('Course not found');
        }

        course.testimonials.push(review._id);

        // Save the updated course
        const updatedCourse = await Course.findByIdAndUpdate(
            review.courseId,
            { testimonials: course.testimonials },
            { new: true }
        );

        if (!updatedCourse) {
            throw new Error('Failed to update course with new testimonial');
        }

        return {
            message: 'Review created successfully',
            success: true
        };
    } catch (error) {
        throw new Error(error);
    }
};
