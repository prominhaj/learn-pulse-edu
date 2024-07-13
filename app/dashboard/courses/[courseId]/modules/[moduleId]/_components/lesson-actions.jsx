"use client";
import { Trash } from "lucide-react";
import { SubmitActionBtn } from "../../../../../_components/submit-action-btn";
import { deleteLesson, lessonPublished } from "@/app/actions/lesson";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LessonActions = ({ active, courseId, moduleId, lessonId, modalClose }) => {
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

    // Handle Lesson Delete
    const handleDelete = async () => {
        try {
            await deleteLesson(lessonId, moduleId, courseId)
            toast.success("Lesson Deleted Successfully!");
            if (modalClose) {
                modalClose()
            }
            router.push(`/dashboard/courses/${courseId}/modules/${moduleId}`)
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

            <form action={handleDelete}>
                <SubmitActionBtn>
                    <Trash className="w-4 h-4" />
                </SubmitActionBtn>
            </form>
        </div >
    );
};
