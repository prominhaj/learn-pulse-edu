"use client";

import { deleteQuiz } from "@/app/actions/quiz";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

const QuizCardActions = ({ quizId }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { quizSetId } = useParams();

    // Edit button handler
    const handleEdit = useCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.set('quizId', quizId);
        router.replace(`${pathname}?${params.toString()}`);
    }, [searchParams, quizId, pathname, router]);

    // Delete button handler
    const handleDelete = useCallback(async () => {
        try {
            await deleteQuiz(quizId, quizSetId)
            toast.success("Quiz deleted successfully")
        } catch (error) {
            toast.error(error.message)
        }
    }, [quizId, quizSetId]);

    return (
        <>
            <Button onClick={handleEdit} variant='ghost' size='sm'>
                <Pencil className='w-3 mr-1' /> Edit
            </Button>
            <form action={handleDelete}>
                <SubmitButton className="text-destructive" variant="ghost">
                    <Trash className='w-3 mr-1' /> Delete
                </SubmitButton>
            </form>
        </>
    );
};

export default QuizCardActions;
