"use client";
import Spinner from "@/components/globals/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from 'react-dom';

const LessonNextButton = ({ nextLessonId }) => {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending || !nextLessonId}
            variant="primary"
            className={cn(
                !nextLessonId && 'bg-opacity-50 opacity-50 cursor-not-allowed',
                'h-7 md:h-auto rounded-3xl disabled:opacity-70 disabled:bg-opacity-70 disabled:cursor-not-allowed'
            )}
        >
            {pending && <Spinner className="dark:!text-white" />} Next
        </Button>
    );
};

export default LessonNextButton;