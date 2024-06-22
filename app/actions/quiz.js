'use server';

import QuizSet from '@/modals/quiz-set-modal';
import Quiz from '@/modals/quizzes-modal';
import { revalidatePath } from 'next/cache';

export const createAndUpdateQuiz = async (quizData, quizSetId, quizId) => {
    try {
        if (quizId) {
            // Update Quiz
            await Quiz.findByIdAndUpdate(quizId, quizData);
        } else {
            // Create Quiz
            const quiz = await Quiz.create(quizData);
            // quiz Set
            const quizSet = await QuizSet.findById(quizSetId);
            quizSet.quizIds.push(quiz._id);
            quizSet.save();
        }

        // Revalidate Path
        revalidatePath(`/dashboard/quiz-sets/${quizSetId}`);
    } catch (error) {
        throw new Error(error);
    }
};
