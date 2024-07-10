"use client";
import VideoUploader from "@/components/globals/VidoeUploder/VideoUploader";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Player from "next-video/player";
import { toast } from "sonner";
import { deleteIntroductionVideo } from "@/app/actions/course";
import Spinner from "@/components/globals/Spinner/Spinner";

const IntroductionVideoForm = ({ courseId, initialData }) => {
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

        const formData = new FormData();
        formData.append("video_file", file);
        formData.append("updateDatabaseName", "course");
        formData.append("courseId", courseId);
        formData.append("public_id", initialData?.public_id);

        try {
            const response = await axios.post("/api/upload-video", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                },
            });

            if (response.data.success) {
                setVideoUrl(response.data.video.url);
                toast.success(response.data.message);
                setFile(null);
                setUploadProgress(0);
                refresh();
                if (initialData?.public_id) {
                    toggleEdit();
                }
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsUploading(false);
        }
    }, [file, initialData, refresh, toggleEdit, setIsUploading, courseId]);

    // Upload Video Delete
    const handleVideoDelete = async () => {
        setDeleteLoading(true);
        try {
            await deleteIntroductionVideo(courseId, initialData?.public_id);
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
                        <Player className="object-cover w-full h-full overflow-hidden" src={videoUrl} />
                    </div>
                ) : (
                    <VideoUploader
                        handleSubmit={handleSubmit}
                        isUploading={isUploading}
                        setFile={setFile}
                        file={file}
                        uploadProgress={uploadProgress}
                    />
                )
            }

        </div>
    );
};

export default IntroductionVideoForm;