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

export const courseSubTitleSchema = z.object({
    sub_title: z.string().min(1, {
        message: 'Sub Title is required'
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

export const courseCreateModuleSchema = z.object({
    title: z.string().min(1)
});

export const courseModuleUpdateSchema = z.object({
    title: z.string().min(1)
});

export const createModuleLessonSchema = z.object({
    title: z.string().min(1)
});

export const courseLearningSchema = z.object({
    learning: z.string().min(1, { message: 'Learning is required' })
});
