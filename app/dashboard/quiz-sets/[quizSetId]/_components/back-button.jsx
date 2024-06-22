import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const BackButton = () => {

    return (
        <Link href="/dashboard/quiz-sets" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex items-center gap-2")}>
            <ArrowLeft className="w-4 h-4" />
            Back
        </Link>
    );
};

export default BackButton;