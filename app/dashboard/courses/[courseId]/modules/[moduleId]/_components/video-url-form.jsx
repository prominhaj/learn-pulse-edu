"use client";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VideoUploader from "@/components/globals/VidoeUploder/VideoUploader";
import Player from "@/components/globals/Player/Player";

export const VideoUrlForm = ({ initialData, lessonId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(initialData?.url);

  const toggleEdit = () => setIsEditing((current) => !current);


  return (
    <div className="p-4 mt-6 bg-gray-100 border rounded-md dark:bg-gray-800/70 dark:border-gray-700">
      <div className="flex items-center justify-between font-medium">
        Video Upload
        <Button variant="ghost" onClick={toggleEdit}>
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
            <Player className="object-cover w-full h-full" source={videoUrl} />
          </div>
        ) : (
          <p className="italic text-center text-muted-foreground">
            No video added
          </p>
        )
      )}

      {/* Video Uploader */}
      {isEditing && (
        <div className="mt-4">
          <VideoUploader lessonId={lessonId} onVideoUrl={setVideoUrl} />
        </div>
      )}
    </div>
  );
};
