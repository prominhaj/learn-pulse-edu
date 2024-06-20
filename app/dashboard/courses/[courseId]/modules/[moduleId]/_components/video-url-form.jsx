"use client";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import VideoUploader from "@/components/globals/VidoeUploder/VideoUploader";
import Player from 'next-video/player';

export const VideoUrlForm = ({ initialData, lessonId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(initialData?.url);
  const [isUploading, setIsUploading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="p-4 mt-6 bg-gray-100 border rounded-md dark:bg-gray-800/70 dark:border-gray-700">
      <div className="flex items-center justify-between font-medium">
        Video Upload
        <Button disabled={isUploading} variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        videoUrl ? (
          <div className="w-full mt-4 h-60">
            <Player
              className="object-cover w-full h-full"
              src={videoUrl}
            />
          </div>
        ) : (
          <div className="mt-4">
            <VideoUploader
              lessonId={lessonId}
              onVideoUrl={setVideoUrl}
              initialData={initialData}
              toggleEdit={toggleEdit}
              setIsUploading={setIsUploading}
              isUploading={isUploading}
            />
          </div>
        )
      )}

      {/* Video Uploader */}
      {isEditing && (
        <div className="mt-4">
          <VideoUploader
            lessonId={lessonId}
            onVideoUrl={setVideoUrl}
            initialData={initialData}
            toggleEdit={toggleEdit}
            setIsUploading={setIsUploading}
            isUploading={isUploading}
          />
        </div>
      )}
    </div>
  );
};
