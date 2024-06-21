"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();
    // Back button
    const back = () => {
        router.back();
    };

    return (
        <Button size="sm" variant="outline" className="flex items-center gap-2" onClick={back}>
            <ArrowLeft className="w-4 h-4" />
            Back
        </Button>
    );
};

export default BackButton;