import { replaceMongoIdInArray } from '@/lib/convertData';
import QuizSet from '@/modals/quiz-set-modal';

export const getAllQuizSet = async () => {
    try {
        const allQuizSet = await QuizSet.find().lean();
        return replaceMongoIdInArray(allQuizSet);
    } catch (error) {
        throw new Error(error);
    }
};
