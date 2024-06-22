'use server';

import QuizSet from '@/modals/quiz-set-modal';
import { revalidatePath } from 'next/cache';

export const updateQuizSet = async (quizSetId, updatedData) => {
    try {
        await QuizSet.findByIdAndUpdate(quizSetId, updatedData);

        // Revalidate Path
        revalidatePath(`/dashboard/quiz-sets/${quizSetId}`);
    } catch (error) {
        throw new Error(error);
    }
};

export const quizSetPublished = async (quizSetId) => {
    try {
        const quizSet = await QuizSet.findById(quizSetId);
        await QuizSet.findByIdAndUpdate(quizSetId, {
            active: !quizSet?.active
        });

        // Revalidate Path
        revalidatePath(`/dashboard/quiz-sets/${quizSetId}`);
    } catch (error) {
        throw new Error(error);
    }
};
