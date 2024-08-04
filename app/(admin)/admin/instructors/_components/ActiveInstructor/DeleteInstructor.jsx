"use client";

import { removeInstructorToStudentRole } from "@/app/actions/admin";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const DeleteInstructor = ({ id }) => {
    // Handle Delete instructor in admin
    const deleteInstructorAction = async () => {
        try {
            const result = await removeInstructorToStudentRole(id);
            if (result.success) {
                toast.success(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form action={deleteInstructorAction}>
            <SubmitButton variant="destructive" size="sm" className="flex items-center gap-1 cursor-pointer">
                <Trash className="w-4 h-4" />
                Remove
            </SubmitButton>
        </form>
    );
};

export default DeleteInstructor;