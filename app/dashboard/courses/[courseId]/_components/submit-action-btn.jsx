"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from 'react-dom'

export const SubmitActionBtn = ({ children, variant }) => {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" variant={variant || "default"} size="sm" disabled={pending}>
            {pending ? (
                <div className="flex items-center justify-center">
                    <div className="h-5 w-5 animate-[spin_0.3s_linear_infinite] rounded-full border-2 border-primary border-t-transparent" />
                </div>
            ) : children}
        </Button>
    )
}