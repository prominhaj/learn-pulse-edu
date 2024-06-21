import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Circle, CircleCheck, Pencil, Trash } from "lucide-react";

const QuizCard = ({ quiz }) => {
    return (
        <div
            key={quiz.id}
            className='p-4 border rounded-md shadow-md dark:border-gray-800 dark:shadow-gray-800 bg-gray-50 dark:bg-gray-900 lg:p-6'
        >
            <h2 className='mb-3'>{quiz.title}</h2>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {quiz?.options?.map((option) => {
                    return (
                        <div
                            className={cn(
                                'py-1.5 rounded-sm  text-sm flex items-center gap-1 text-gray-600 dark:text-gray-300'
                            )}
                            key={option.label}
                        >
                            {option.isTrue ? (
                                <CircleCheck className='size-4 text-emerald-500 ' />
                            ) : (
                                <Circle className='size-4' />
                            )}

                            <p>{option.label}</p>
                        </div>
                    );
                })}
            </div>
            <div className='flex items-center justify-end gap-2 mt-6'>
                <Button variant='ghost' size='sm'>
                    <Pencil className='w-3 mr-1' /> Edit
                </Button>
                <Button
                    size='sm'
                    className='text-destructive'
                    variant='ghost'
                >
                    <Trash className='w-3 mr-1' /> Delete
                </Button>
            </div>
        </div>
    );
};

export default QuizCard;