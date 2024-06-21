import { getAllQuizSet } from '@/queries/quiz-set';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

const QuizSets = async () => {
    const quizzes = await getAllQuizSet();

    return (
        <div className='p-6'>
            <DataTable columns={columns} data={quizzes} />
        </div>
    );
};

export default QuizSets;
