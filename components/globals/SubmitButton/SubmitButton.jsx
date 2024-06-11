"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from 'react-dom'


const SubmitButton = ({ className, children }) => {
    const { pending } = useFormStatus();

    return (
        <>
            <Button disabled={pending} type="submit" className={cn(`${className} disabled:opacity-50 disabled:cursor-not-allowed`)}>
                {children}
            </Button>
        </>
    );
};

export default SubmitButton;