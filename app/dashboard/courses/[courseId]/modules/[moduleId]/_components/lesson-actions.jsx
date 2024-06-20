"use client";
import { Trash } from "lucide-react";
import { SubmitActionBtn } from "../../../_components/submit-action-btn";
import { lessonPublished } from "@/app/actions/lesson";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LessonActions = ({ active, moduleId, lessonId }) => {
    const router = useRouter();

    // Handle Publish
    const handlePublish = async () => {
        try {
            await lessonPublished(lessonId)
            toast.success("Lesson Published Successfully!");
            router.refresh()
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <form action={handlePublish}>
                <SubmitActionBtn variant="outline">
                    {active ? "Unpublish" : "Publish"}
                </SubmitActionBtn>
            </form>

            <form action="">
                <SubmitActionBtn>
                    <Trash className="w-4 h-4" />
                </SubmitActionBtn>
            </form>
        </div >
    );
};
