import { z } from 'zod';

export const lessonTitleSchema = z.object({
    title: z.string().min(1)
});

export const lessonVideoSchema = z.object({
    video_url: z.string().min(1, {
        message: 'Video URL is Required'
    }),
    duration: z.string().min(1, {
        message: 'Duration is Required'
    })
});

export const lessonDescriptionSchema = z.object({
    description: z.string().min(1)
});

export const lessonAccessSchema = z.object({
    isFree: z.boolean().default(false)
});
