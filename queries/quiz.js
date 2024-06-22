import { replaceMongoIdInObject } from '@/lib/convertData';
import Quiz from '@/modals/quizzes-modal';

export const getQuizById = async (quizId) => {
    try {
        const quizzes = await Quiz.findById(quizId).lean();
        return replaceMongoIdInObject(quizzes);
    } catch (error) {
        throw new Error(error);
    }
};
