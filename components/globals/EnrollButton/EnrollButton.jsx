"use client";
import { createCheckoutSession } from "@/app/actions/stripe";
import { Button, buttonVariants } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EnrollButton = ({ asLink, courseId, price }) => {
    const { user } = useAuth();
    const router = useRouter();

    // Enroll button Action
    const formAction = async () => {
        if (!user) {
            router.push("/login")
            return
        }
        try {
            const response = await createCheckoutSession(courseId);
            if (response?.url) {
                window.location.assign(response?.url)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form action={formAction}>
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
                        <Button
                            type="submit"
                            variant='primary'
                            className='gap-1 text-xs h-7'
                        >
                            Enroll
                            <ArrowRight className='w-3' />
                        </Button>
                    )
                ) : (
                    price === 0 ? (
                        <Link
                            href={`/free-enroll?courseId=${courseId}`}
                            className={cn(buttonVariants({ size: 'lg', variant: "primary" }, "tracking-wide"))}>
                            Free Enroll
                        </Link>
                    ) : (
                        <Button
                            variant='default'
                            size="lg"
                            type="submit"
                            className={cn("tracking-wide font-semibold rounded-3xl")}
                        >
                            Enroll Now
                        </Button>
                    )
                )
            }
        </form>
    );
};

export default EnrollButton;