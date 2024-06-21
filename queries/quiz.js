import Quiz from '@/modals/quizzes-modal';

export const getQuizzes = async () => {
    try {
        const quizzes = await Quiz.find().lean();
        return quizzes;
    } catch (error) {
        throw new Error(error);
    }
};
