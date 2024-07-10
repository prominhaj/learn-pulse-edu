"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Player from "next-video/player";
import VideoUploader from "@/components/globals/VidoeUploder/VideoUploader";
import OthersUploader from "./others-upload";
import ReactPlayer from 'react-player/youtube';
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export const VideoUrlForm = ({ initialData, lessonId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isOthers, setIsOthers] = useState(false);
  const [videoUrl, setVideoUrl] = useState(initialData?.video?.url);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);
  const toggleOthers = useCallback(() => setIsOthers((current) => !current), []);

  // Upload Video
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("video_file", file);
    formData.append("lessonId", lessonId);
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
        router.refresh();
        if (initialData?.public_id) {
          toggleEdit();
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  }, [file, lessonId, initialData, router, toggleEdit, setIsUploading]);

  return (
    <div className="p-4 mt-6 bg-gray-100 border rounded-md dark:bg-gray-800/70 dark:border-gray-700">
      <div className="flex items-center justify-between font-medium">
        Video Upload
        <div className="flex items-center gap-3">
          <Button onClick={toggleOthers} variant="secondary">
            {isOthers ? "Cancel" : "Others"}
          </Button>
          <Button disabled={isUploading} variant="ghost" onClick={toggleEdit}>
            {isEditing ? <>Cancel</> : <><Pencil className="w-4 h-4 mr-2" /> Edit</>}
          </Button>
        </div>
      </div>

      {/* Render logic based on state */}
      {isOthers ? (
        <div className="mt-4">
          <OthersUploader
            duration={initialData?.duration}
            videoUrl={initialData?.video?.url}
            lessonId={lessonId}
            toggleOthers={toggleOthers}
          />
        </div>
      ) : (
        <>
          {isEditing ? (
            <div className="mt-4">
              <VideoUploader
                uploadProgress={uploadProgress}
                setFile={setFile}
                file={file}
                isUploading={isUploading}
                handleSubmit={handleSubmit}
              />
            </div>
          ) : (
            videoUrl ? (
              <div className="w-full mt-4 h-60">
                {
                  initialData?.youtube ? (
                    <div className="w-full h-full">
                      <ReactPlayer
                        width="100%"
                        height="100%"
                        className="object-cover w-full h-full"
                        url={initialData?.url}
                      />
                    </div>
                  ) : (
                    <Player className="object-cover w-full h-full" src={videoUrl} />
                  )
                }
              </div>
            ) : (
              <div className="mt-4">
                <VideoUploader
                  uploadProgress={uploadProgress}
                  setFile={setFile}
                  file={file}
                  isUploading={isUploading}
                  handleSubmit={handleSubmit}
                />
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};
