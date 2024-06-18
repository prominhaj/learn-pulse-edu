import { z } from 'zod';

export const lessonTitleSchema = z.object({
    title: z.string().min(1)
});
