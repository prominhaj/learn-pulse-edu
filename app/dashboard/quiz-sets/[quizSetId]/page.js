import AlertBanner from '@/components/globals/AlertBanner/AlertBanner';
import { QuizSetAction } from './_components/quiz-set-action';
import { TitleForm } from './_components/title-form';
import { AddQuizForm } from './_components/add-quiz-form';
import BackButton from './_components/back-button';
import QuizCard from './_components/quiz-card';
import { getQuizSetById } from '@/queries/quiz-set';
import { replaceMongoIdInObject } from '@/lib/convertData';
import { getQuizById } from '@/queries/quiz';

// Metadata
export const metadata = {
    title: 'Quiz Set - Dashboard - Learn Pulse Edu'
};

const EditQuizSet = async ({ params: { quizSetId }, searchParams: { quizId } }) => {
    const quizSet = await getQuizSetById(quizSetId);
    const getEditQuiz = await getQuizById(quizId);

    return (
        <>
            {!quizSet?.active && (
                <AlertBanner
                    label='This course is unpublished. It will not be visible in the course.'
                    variant='warning'
                />
            )}{' '}
            <div className='p-6'>
                <div className='flex items-center justify-between'>
                    <BackButton />
                    <QuizSetAction />
                </div>
                <div className='grid grid-cols-1 gap-6 mt-16 lg:grid-cols-2'>
                    {/* Quiz List */}
                    <div className='max-lg:order-2'>
                        <h2 className='mb-6 text-xl'>Quiz List</h2>
                        {quizSet?.quizIds?.length === 0 && (
                            <AlertBanner
                                label='No Quiz are in the set, add some using the form above.'
                                variant='warning'
                                className='mb-6 rounded'
                            />
                        )}

                        <div className='space-y-6'>
                            {quizSet?.quizIds?.map((quiz) => {
                                const q = replaceMongoIdInObject(quiz);
                                return <QuizCard key={q?._id} quiz={q} />;
                            })}
                        </div>
                    </div>
                    {/*  */}
                    <div>
                        <div className='flex items-center gap-x-2'>
                            <h2 className='text-xl'>Customize your quiz set</h2>
                        </div>
                        <div className='max-w-[800px]'>
                            <TitleForm
                                quizSetId={quizSetId}
                                initialData={{
                                    title: quizSet?.title
                                }}
                            />
                        </div>

                        <div className='max-w-[800px]'>
                            <AddQuizForm quizSetId={quizSetId} editQuiz={getEditQuiz} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditQuizSet;
