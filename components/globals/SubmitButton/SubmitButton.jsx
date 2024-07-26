"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from 'react-dom'
import Spinner from "../Spinner/Spinner";


const SubmitButton = ({ className, children, loading, disabled, variant }) => {
    const { pending } = useFormStatus();

    return (
        <>
            <Button
                disabled={pending || loading || disabled}
                type="submit"
                variant={variant}
                className={cn(`${className} disabled:opacity-50 disabled:cursor-not-allowed`)}
            >
                {pending || loading ? (
                    <>
                        <Spinner /> Loading...
                    </>
                ) : children}
            </Button>
        </>
    );
};

export default SubmitButton;