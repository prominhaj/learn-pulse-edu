import { replaceMongoIdInArray, replaceMongoIdInObject } from '@/lib/convertData';
import QuizSet from '@/modals/quiz-set-modal';
import Quiz from '@/modals/quizzes-modal';

export const getAllQuizSet = async () => {
    try {
        const allQuizSet = await QuizSet.find().lean();
        return replaceMongoIdInArray(allQuizSet);
    } catch (error) {
        throw new Error(error);
    }
};

export const getQuizSetById = async (quizSetId) => {
    try {
        const quizSet = await QuizSet.findById(quizSetId)
            .populate({
                path: 'quizIds',
                model: Quiz
            })
            .lean();
        return replaceMongoIdInObject(quizSet);
    } catch (error) {
        throw new Error(error);
    }
};
