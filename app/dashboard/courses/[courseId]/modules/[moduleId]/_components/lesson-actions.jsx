"use client";
import { Trash } from "lucide-react";
import { deleteLesson, lessonPublished } from "@/app/actions/lesson";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";

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
                <SubmitButton variant="outline">
                    {active ? "UnPublish" : "Publish"}
                </SubmitButton>
            </form>

            <form action={handleDelete}>
                <SubmitButton>
                    <Trash className="w-4 h-4" />
                </SubmitButton>
            </form>
        </div >
    );
};
