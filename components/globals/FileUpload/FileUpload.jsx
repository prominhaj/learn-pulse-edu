"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CloudUpload, Trash } from "lucide-react";
import Image from "next/image";

export const UploadDropzone = ({ onUpload, isUploading, image }) => {
    const handleFileChange = (e) => {
        onUpload(e.target.files[0]);
    };

    const handleRemoveImage = () => {
        onUpload(null);
    };

    return (
        <div>
            <input
                onChange={handleFileChange}
                id="file-uploader"
                name="file"
                type="file"
                accept="image/*"
                multiple={false}
                className="hidden"
                disabled={isUploading}
            />

            {image ? (
                <div className="relative mt-4">
                    <Button
                        disabled={isUploading}
                        onClick={handleRemoveImage}
                        className="absolute z-10 top-2 right-2"
                        size="sm"
                    >
                        <Trash className="w-5 h-5" />
                    </Button>
                    <div className="overflow-hidden rounded max-h-[27.5rem]">
                        <Image
                            className="object-cover w-full h-full rounded"
                            src={URL.createObjectURL(image)}
                            width={500}
                            height={400}
                            alt="photo selected"
                        />
                    </div>
                </div>
            ) : (
                <label
                    htmlFor="file-uploader"
                    className={cn(
                        "mt-3 flex cursor-pointer items-center justify-center rounded-md border dark:border-gray-700 border-dashed p-3 py-12 hover:bg-muted/30",
                        isUploading ? "pointer-events-none !cursor-not-allowed opacity-80" : ""
                    )}
                >
                    <div className="flex flex-col items-center gap-3 text-center !text-[#858585] dark:!text-gray-300">
                        <CloudUpload size={48} className="text-gray-600 dark:text-gray-400" />
                        <h4 className="!font-normal !text-[#858585] dark:!text-gray-400">
                            <span className="font-semibold text-black underline dark:text-white">
                                Click to upload
                            </span>{" "}
                            or drag and drop <br />
                            Maximum file size 50 MB.
                        </h4>
                    </div>
                </label>
            )}
        </div>
    );
};
