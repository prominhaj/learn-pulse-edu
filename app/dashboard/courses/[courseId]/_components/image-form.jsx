"use client";

import { useCallback, useState } from "react";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/components/globals/FileUpload/FileUpload";
import { cn } from "@/lib/utils";
import { fileUpload } from "@/lib/file-upload";
import { updateCourse } from "@/app/actions/course";
import VideoUpload from "@/components/globals/FileUpload/VideoUpload";


export const ImageForm = ({ initialData, courseId, imageName }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const toggleEdit = useCallback(() => {
    setIsEditing((current) => !current);
  }, []);

  const handleUpload = useCallback(async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    setIsUploading(true);

    try {
      const { downloadURL } = await fileUpload(image, `images/courses`, setProgress, null, imageName ? imageName : null);

      const data = {
        thumbnail: {
          url: downloadURL,
          fileName: image?.name
        }
      };
      const result = await updateCourse(courseId, data);

      if (result?.success) {
        router.refresh();
        toast.success("Image Upload SuccessFully");
        setImage(null)
        setProgress(0);
        toggleEdit();
      } else {
        toast.error("Failed to upload image");
      }

    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setIsUploading(false);
    }
  }, [image, courseId, router, toggleEdit, imageName]);

  return (
    <div className="p-4 mt-6 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between font-medium">
        Course Image
        <Button disabled={isUploading} variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.img?.src && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData?.img?.src && (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.img?.src ? (
          <div className="flex items-center justify-center mt-2 rounded-md h-60 bg-slate-200 dark:bg-gray-800">
            <ImageIcon className="w-10 h-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Image
              {...initialData?.img}
              alt="Upload"
              className="object-cover w-full h-full rounded-md aspect-video"
              placeholder='blur'
              blurDataURL={initialData?.base64}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              priority
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <VideoUpload
            isImage={true}
            progressValue={progress}
            setFile={setImage}
            file={image}
            uploadAction={handleUpload}
            pending={isUploading}
          />
        </div>
      )}
    </div>
  );
};
