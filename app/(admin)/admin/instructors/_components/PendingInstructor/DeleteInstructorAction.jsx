"use client";

import { changeRoleByInstructor } from "@/app/actions/admin";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const DeleteInstructorAction = ({ id }) => {

    const deleteInstructorAction = async () => {
        try {
            const result = await changeRoleByInstructor(id, "Student");
            if (result.success) {
                toast.success(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <form action={deleteInstructorAction}>
            <SubmitButton
                variant="destructive"
                size="sm"
                className="flex items-center gap-1 cursor-pointer"
            >
                <Trash className="w-4 h-4" />
                Delete
            </SubmitButton>
        </form>
    );
};

export default DeleteInstructorAction;