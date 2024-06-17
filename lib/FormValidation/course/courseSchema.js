import { z } from 'zod';

export const createCourseSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required!'
    }),
    description: z.string().min(1, {
        message: 'Description is required!'
    })
});

export const courseTitleSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'
    })
});

export const courseDescriptionSchema = z.object({
    description: z.string().min(1, {
        message: 'Description is required'
    })
});

export const courseCategorySchema = z.object({
    category: z.string().min(1)
});

export const coursePriceSchema = z.object({
    price: z.coerce.number()
});
