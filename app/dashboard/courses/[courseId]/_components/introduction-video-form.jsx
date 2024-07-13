"use client";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { deleteIntroductionVideo, updateCourse } from "@/app/actions/course";
import Spinner from "@/components/globals/Spinner/Spinner";
import { VideoPlayer } from "@/components/globals/VideoPlayer/VideoPlayer";
import VideoUpload from "@/components/globals/FileUpload/VideoUpload";
import { fileUpload } from "@/lib/file-upload";

const IntroductionVideoForm = ({ courseId, initialData, slug }) => {
    const { refresh } = useRouter()
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [videoUrl, setVideoUrl] = useState(initialData?.url);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const toggleEdit = useCallback(() => setIsEditing((prev) => !prev), []);

    // Upload Video
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true);

        try {
            const fileName = initialData?.fileName || null;

            const uploadFile = await fileUpload(file, `courses/${slug}`, setUploadProgress, null, fileName);
            const data = {
                introductionVideo: {
                    url: uploadFile,
                    fileName: file?.name
                }
            };

            const updatedCourse = await updateCourse(courseId, data)

            if (updatedCourse.success) {
                setVideoUrl(uploadFile);
                toast.success("Video updated successfully");
                setFile(null);
                toggleEdit();
                setUploadProgress(0);
                refresh();
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsUploading(false);
        }
    }, [file, initialData, refresh, toggleEdit, setIsUploading, courseId, slug]);


    // Upload Video Delete
    const handleVideoDelete = async () => {
        setDeleteLoading(true);
        try {
            await deleteIntroductionVideo(courseId, `courses/${slug}`, initialData?.fileName || null);
            setVideoUrl(null)
            toast.success("Introduction Video Deleted Successfully!");
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setDeleteLoading(false)
        }
    }

    return (
        <div className="p-4 mt-6 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4 font-medium">
                Introduction Video
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={toggleEdit}>
                        {isEditing ? (
                            <>Cancel</>
                        ) : (
                            <>
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit Video
                            </>
                        )}
                    </Button>
                    {videoUrl && (
                        <Button onClick={handleVideoDelete} size="sm" variant="destructive">
                            {deleteLoading ? <Spinner className="!m-0 !text-white" /> : <Trash className="w-4 h-4" />}
                        </Button>
                    )}
                </div>
            </div>
            {
                videoUrl && !isEditing ? (
                    <div className="w-full h-60">
                        <VideoPlayer url={videoUrl} />
                    </div>
                ) : (
                    <VideoUpload
                        pending={isUploading}
                        progressValue={uploadProgress}
                        file={file}
                        setFile={setFile}
                        uploadAction={handleSubmit}
                    />
                )
            }

        </div>
    );
};

export default IntroductionVideoForm;