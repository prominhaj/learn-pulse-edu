"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFormStatus } from 'react-dom'
import Spinner from "@/components/globals/Spinner/Spinner";
import { createNewEnrollment } from "@/app/actions/enrollmenst";

const FreeEnroll = ({ courseId, user }) => {
    const { pending } = useFormStatus()

    const handleFreeEnroll = async () => {
        try {
            const enrollData = {
                user_id: user?.id,
                course_id: courseId,
                status: 'complete',
                method: 'Free'
            };
            const enrolled = await createNewEnrollment(enrollData);
            if (enrolled?.success) {
                toast.success(enrolled?.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form action={handleFreeEnroll}>
            <Button disabled={pending} variant='primary' className='w-full mt-4 disabled:opacity-70 disabled:bg-opacity-70 disabled:cursor-not-allowed'>
                {pending ? <><Spinner /> Loading...</> : "Pay Now"}
            </Button>
        </form>
    );
};

export default FreeEnroll;