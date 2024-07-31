"use client";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { useFormStatus } from "react-dom";

const Btn = () => {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} className={cn(pending && "animate-spin", "text-foreground")}>
            <RefreshCw />
        </button>
    );
};

export default Btn;