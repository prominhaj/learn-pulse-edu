"use client";

import { changeRoleByInstructor } from "@/app/actions/admin";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { Check } from "lucide-react";
import { toast } from "sonner";

const AcceptAction = ({ id }) => {

    const acceptInstructorAction = async () => {
        try {
            const result = await changeRoleByInstructor(id, "Teacher");
            if (result.success) {
                toast.success(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form action={acceptInstructorAction}>
            <SubmitButton variant="destructive" size="sm" className="flex items-center gap-1 bg-green-500 cursor-pointer hover:bg-green-400">
                <Check className="w-4 h-4" />
                Accept
            </SubmitButton>
        </form>
    );
};

export default AcceptAction;