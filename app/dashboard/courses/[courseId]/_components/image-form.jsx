"use client";

import { useEffect, useState } from "react";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/components/globals/FileUpload/FileUpload";


export const ImageForm = ({ initialData, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null)

  const toggleEdit = () => setIsEditing((current) => !current);

  useEffect(() => {
    if (image) {
      const fileUploader = async () => {
        try {
          const formData = new FormData();
          formData.append("image", image[0]);
          formData.append("courseId", courseId);
          formData.append("public_id", initialData?.public_id);

          const response = await fetch("/api/upload-image", {
            method: "POST",
            body: formData,
          })
          const result = await response.json();

          if (result?.success) {
            router.refresh();
            toast.success(result?.message);
            toggleEdit();
          }

        } catch (error) {
          toast.error(error.message);
        }
      }
      fileUploader()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  return (
    <div className="p-4 mt-6 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between font-medium">
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
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
          <UploadDropzone onUpload={setImage} />
          <div className="mt-4 text-xs text-muted-foreground">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
