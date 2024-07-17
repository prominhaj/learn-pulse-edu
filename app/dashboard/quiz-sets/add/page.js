import QuizSetForm from './_components/quiz-set-form';

export const dynamic = 'force-dynamic';

const AddQuizSet = () => {
    return (
        <div className='flex h-full max-w-5xl p-6 mx-auto md:items-center md:justify-center'>
            <div className='max-w-full w-[536px]'>
                <QuizSetForm />
            </div>
        </div>
    );
};

export default AddQuizSet;
