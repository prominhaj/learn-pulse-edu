import { cn } from "@/lib/utils";
import { Circle, CircleCheck, } from "lucide-react";
import QuizCardActions from "./quiz-card-actions";

const QuizCard = ({ quiz }) => {
    return (
        <div
            className='p-4 border rounded-md shadow-md dark:border-gray-800 dark:shadow-gray-800 bg-gray-50 dark:bg-gray-900 lg:p-6'
        >
            <h2 className='mb-3'>{quiz?.question ?? "No question"}</h2>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {quiz?.options?.map((option) => {
                    return (
                        <div
                            className={cn(
                                'py-1.5 rounded-sm  text-sm flex items-center gap-1 text-gray-600 dark:text-gray-300'
                            )}
                            key={option.text}
                        >
                            {option?.is_correct ? (
                                <CircleCheck className='size-4 text-emerald-500 ' />
                            ) : (
                                <Circle className='size-4' />
                            )}

                            <p>{option.text}</p>
                        </div>
                    );
                })}
            </div>
            <div className='flex items-center justify-end gap-2 mt-6'>
                <QuizCardActions quizId={quiz?.id} />
            </div>
        </div>
    );
};

export default QuizCard;