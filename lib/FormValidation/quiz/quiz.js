import { z } from 'zod';

export const quizSetTitleSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'
    })
});

export const addQuizFormSchema = z
    .object({
        title: z
            .string({
                required_error: 'Question is required'
            })
            .min(1, {
                message: 'Title is required'
            }),
        description: z
            .string({
                required_error: 'Description is required'
            })
            .min(1, {
                message: 'Description is required'
            }),
        optionA: z.object({
            text: z
                .string({
                    required_error: 'Option text is required'
                })
                .min(1, {
                    message: 'Option text is required'
                }),
            is_correct: z.boolean().default(false)
        }),
        optionB: z.object({
            text: z
                .string({
                    required_error: 'Option text is required'
                })
                .min(1, {
                    message: 'Option text is required'
                }),
            is_correct: z.boolean().default(false)
        }),
        optionC: z.object({
            text: z
                .string({
                    required_error: 'Option text is required'
                })
                .min(1, {
                    message: 'Option text is required'
                }),
            is_correct: z.boolean().default(false)
        }),
        optionD: z.object({
            text: z
                .string({
                    required_error: 'Option text is required'
                })
                .min(1, {
                    message: 'Option text is required'
                }),
            is_correct: z.boolean().default(false)
        }),
        mark: z
            .number({
                required_error: 'Mark is required'
            })
            .min(1, {
                message: 'Mark must be at least 1'
            })
    })
    .refine(
        (data) => {
            return (
                data.optionA.is_correct ||
                data.optionB.is_correct ||
                data.optionC.is_correct ||
                data.optionD.is_correct
            );
        },
        {
            message: 'Please select one correct option.',
            path: ['correctOption']
        }
    );
