"use client";
import FormControl from "@/app/(auth)/register/_components/FormControl";
import { updateLesson } from "@/app/actions/lesson";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const OthersUploader = ({ lessonId, toggleOthers }) => {
    const { refresh } = useRouter();

    const handleUpload = async (formData) => {
        const url = formData.get('url');
        const duration = formData.get('duration');
        if (!url || !duration) {
            toast.error("Please fill all fields")
            return;
        }
        const formatDuration = parseFloat(duration) * 60;
        try {
            await updateLesson(lessonId, {
                duration: formatDuration.toFixed(2),
                video: {
                    url,
                }
            });
            refresh();
            toast.success("Video updated successfully")
            toggleOthers()
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form action={handleUpload} className="w-full">
            <div className="space-y-3">
                <FormControl
                    id="url"
                    name="url"
                    type="text"
                    label="Video URL"
                    placeholder="Enter Your Video URL..."
                />
                <FormControl
                    id="duration"
                    name="duration"
                    type="text"
                    label="Video Duration"
                    placeholder="Enter Your Video duration..."
                />
            </div>
            <SubmitButton className="w-full mt-4">
                Submit
            </SubmitButton>
        </form>
    )
}


export default OthersUploader;