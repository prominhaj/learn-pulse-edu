"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from 'react-dom';
import Spinner from "../Spinner/Spinner";


const SubmitButton = ({ className, children, loading, disabled, variant, size }) => {
    const { pending } = useFormStatus();

    return (
        <>
            <Button
                disabled={pending || loading || disabled}
                type="submit"
                size={size}
                variant={variant}
                className={cn(`${className} disabled:opacity-50 disabled:cursor-not-allowed`)}
            >
                {pending || loading ? (
                    <span className="flex items-center gap-1.5">
                        <Spinner size={size === "lg" && true} /> Loading...
                    </span>
                ) : children}
            </Button>
        </>
    );
};

export default SubmitButton;