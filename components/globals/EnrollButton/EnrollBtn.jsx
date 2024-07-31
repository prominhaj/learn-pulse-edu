"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from 'react-dom';
import SubmitButton from "../SubmitButton/SubmitButton";

const EnrollBtn = ({ asLink, price }) => {
    const { pending } = useFormStatus();

    return (
        <>
            {
                asLink ? (
                    price === 0 ? (
                        <Link
                            href={`/free-enroll?courseId=${courseId}`}
                            className={cn(buttonVariants({ variant: "ghost" }), "gap-1 text-xs text-sky-700 dark:text-sky-500 h-7")}
                        >
                            Free Enroll
                            <ArrowRight className='w-3' />
                        </Link>
                    ) : (
                        <SubmitButton variant='primary' className="gap-1 text-xs h-7">
                            Enroll
                            <ArrowRight className='w-3' />
                        </SubmitButton>
                    )
                ) : (
                    price === 0 ? (
                        <Link
                            href={`/free-enroll?courseId=${courseId}`}
                            className={cn(buttonVariants({ size: 'lg', variant: "primary" }, "tracking-wide"))}>
                            Free Enroll
                        </Link>
                    ) : (
                        <SubmitButton
                            variant='default'
                            size="lg"
                            className="font-semibold tracking-wide rounded-3xl"
                        >
                            Enroll Now
                        </SubmitButton>
                    )
                )
            }
        </>
    );
};

export default EnrollBtn;