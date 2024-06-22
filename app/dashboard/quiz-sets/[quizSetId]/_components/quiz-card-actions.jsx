"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const QuizCardActions = ({ quizId }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Edit button handler
    const handleEdit = useCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.set('quizId', quizId);
        router.replace(`${pathname}?${params.toString()}`);
    }, [searchParams, quizId, pathname, router]);

    // Delete button handler (assuming this will be implemented later)
    const handleDelete = useCallback(() => {
        // Implement the delete functionality here
    }, []);

    return (
        <>
            <Button onClick={handleEdit} variant='ghost' size='sm'>
                <Pencil className='w-3 mr-1' /> Edit
            </Button>
            <Button
                onClick={handleDelete}
                size='sm'
                className='text-destructive'
                variant='ghost'
            >
                <Trash className='w-3 mr-1' /> Delete
            </Button>
        </>
    );
};

export default QuizCardActions;
