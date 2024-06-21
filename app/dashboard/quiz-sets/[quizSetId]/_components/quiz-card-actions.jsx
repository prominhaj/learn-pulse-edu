"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

const QuizCardActions = ({ quizId }) => {
    return (
        <>
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
        </>
    );
};

export default QuizCardActions;