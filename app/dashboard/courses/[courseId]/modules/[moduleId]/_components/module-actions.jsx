"use client";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { SubmitActionBtn } from "../../../../../_components/submit-action-btn";
import { useRouter } from "next/navigation";
import { moduleDelete, modulePublished } from "@/app/actions/module";

export const ModuleActions = ({ active, moduleId, courseId }) => {
    const router = useRouter();

    // Handle Published 
    const onActive = async () => {
        try {
            await modulePublished(moduleId)
            router.refresh();
            if (active === true) {
                toast.success("Module UnPublished Successfully")
            }
            else {
                toast.success("Module Published Successfully")
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    // Handle Delete
    const onDelete = async () => {
        try {
            await moduleDelete(moduleId, courseId);
            toast.success("Module Deleted Successfully")
            router.push(`/dashboard/courses/${courseId}`);
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="flex items-center gap-x-2">
            <form action={onActive}>
                <SubmitActionBtn variant="outline">
                    {active ? "UnPublish" : "Publish"}
                </SubmitActionBtn>
            </form>

            <form action={onDelete}>
                <SubmitActionBtn>
                    <Trash className="w-4 h-4" />
                </SubmitActionBtn>
            </form>
        </div>
    );
};