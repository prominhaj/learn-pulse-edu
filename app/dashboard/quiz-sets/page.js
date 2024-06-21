import { getAllQuizSet } from '@/queries/quiz-set';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

const quizSets = [
    {
        id: 1,
        title: 'Reactive Accelerator',
        isPublished: true,
        totalQuiz: 10,
        quizes: []
    },
    {
        id: 2,
        title: 'Think In A Redux Way',
        isPublished: false,
        totalQuiz: 50,
        quizes: []
    }
];
const QuizSets = async () => {
    const quizzes = await getAllQuizSet();
    console.log(quizzes);
    return (
        <div className='p-6'>
            <DataTable columns={columns} data={quizzes} />
        </div>
    );
};

export default QuizSets;
