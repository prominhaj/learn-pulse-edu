"use client";
import { createCheckoutSession } from "@/app/actions/stripe";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EnrollBtn from "./EnrollBtn";

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
            <EnrollBtn asLink={asLink} price={price} />
        </form>
    );
};

export default EnrollButton;