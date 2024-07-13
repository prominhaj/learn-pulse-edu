"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import VideoUpload from "@/components/globals/FileUpload/VideoUpload";
import { fileUpload } from "@/lib/file-upload";
import { VideoPlayer } from "@/components/globals/VideoPlayer/VideoPlayer";
import { updateLesson } from "@/app/actions/lesson";

export const VideoUrlForm = ({ initialData, lessonId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(initialData?.video?.url);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);

  // Upload Video 
  const uploadVideoAction = async (e) => {
    setIsUploading(true);
    e.preventDefault();
    if (!file) return;

    try {
      const fileName = initialData?.video?.fileName || null;

      const { downloadURL, duration } = await fileUpload(file, `courses`, setUploadProgress, setDuration, fileName, true);
      const data = {
        duration: parseInt(duration),
        video: {
          url: downloadURL,
          fileName: file?.name
        }
      };

      // Update database name if provided
      const updatedLesson = await updateLesson(lessonId, data);

      if (updatedLesson?.success) {
        toast.success("Video uploaded successfully");
        setVideoUrl(downloadURL);
        setFile(null);
        setIsEditing(false);
        setDuration(0);
        setUploadProgress(0);
        router.refresh();
      }
    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="p-4 mt-6 bg-gray-100 border rounded-md dark:bg-gray-800/70 dark:border-gray-700">
      <div className="flex items-center justify-between font-medium">
        Video Upload
        <div className="flex items-center gap-3">
          <Button disabled={isUploading} variant="ghost" onClick={toggleEdit}>
            {isEditing ? <>Cancel</> : <><Pencil className="w-4 h-4 mr-2" /> Edit</>}
          </Button>
        </div>
      </div>

      {isEditing ? (
        <div className="mt-4">
          <VideoUpload
            pending={isUploading}
            progressValue={uploadProgress}
            file={file}
            setFile={setFile}
            uploadAction={uploadVideoAction}
          />
        </div>
      ) : (
        videoUrl ? (
          <div className="w-full mt-4 h-80">
            <VideoPlayer url={videoUrl} />
          </div>
        ) : (
          <div className="mt-4">
            <VideoUpload
              pending={isUploading}
              progressValue={uploadProgress}
              file={file}
              setFile={setFile}
              uploadAction={uploadVideoAction}
            />
          </div>
        )
      )}
    </div>
  );
};
