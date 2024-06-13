"use client";
import { createCheckoutSession } from "@/app/actions/stripe";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const EnrollButton = ({ asLink, courseId }) => {
    // Enroll button Action
    const formAction = async () => {
        try {
            const { url } = await createCheckoutSession(courseId);
            window.location.assign(url)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form action={formAction}>
            {
                asLink ? (
                    <Button
                        variant='ghost'
                        className='gap-1 text-xs text-sky-700 dark:text-sky-500 h-7'
                    >
                        Enroll
                        <ArrowRight className='w-3' />
                    </Button>
                ) : (
                    <Button href='' className={cn(buttonVariants({ size: 'lg' }))}>
                        Enroll Now
                    </Button>
                )
            }

        </form>
    );
};

export default EnrollButton;