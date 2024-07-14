"use client";

import { useCallback, useState } from "react";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/components/globals/FileUpload/FileUpload";
import { cn } from "@/lib/utils";


export const ImageForm = ({ initialData, courseId, public_id }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState(null)

  const toggleEdit = useCallback(() => {
    setIsEditing((current) => !current);
  }, []);

  const handleUpload = useCallback(async () => {
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("courseId", courseId);
      formData.append("public_id", public_id);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result?.success) {
        router.refresh();
        toast.success(result?.message);
        toggleEdit();
      } else {
        toast.error(result?.message || "Failed to upload image");
      }

    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setIsUploading(false);
    }
  }, [image, courseId, public_id, router, toggleEdit]);

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
          <UploadDropzone isUploading={isUploading} onUpload={setImage} image={image} />
          <Button disabled={isUploading || !image} onClick={handleUpload} className={cn('w-full mt-3')}>
            {
              isUploading && (
                <div className="flex items-center justify-center me-2">
                  <div className="h-5 w-5 animate-[spin_0.3s_linear_infinite] rounded-full border-2 border-white dark:border-black border-t-transparent dark:border-t-transparent" />
                </div>
              )
            } Upload Image
          </Button>
          <div className="mt-4 text-xs text-muted-foreground">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};