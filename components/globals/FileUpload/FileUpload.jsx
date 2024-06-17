"use client";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CloudUpload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export const UploadDropzone = (props) => {
    const { isMulti = false, label, onUpload } = props;
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // upload progress utility
    const startSimulatedProgress = () => {
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 95) {
                    clearInterval(interval);
                    prevProgress;
                }
                return prevProgress + 5;
            });
        }, 500);

        return interval;
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        // Do something with the files

        setIsUploading(true);
        const progressInterval = startSimulatedProgress();
        onUpload(acceptedFiles);

        // await new Promise((resolve) => {
        //   setTimeout(() => {
        //     resolve('resolved');
        //   }, 3000);
        // });
        setUploadProgress(100);
        clearInterval(progressInterval);
    }, [onUpload]);

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        onDrop,
        // accept: { 'image/jpeg': [], 'image/png': [] },
        multiple: isMulti,
    });

    useEffect(() => {
        if (fileRejections.length > 1) {
            toast.error("error");
        } else if (fileRejections.length > 0) {
            toast.error("error");
        }
    }, [fileRejections]);

    return (
        <div
            {...getRootProps()}
            className={cn(
                "mt-3 flex cursor-pointer items-center justify-center rounded-md border dark:border-gray-700 border-dashed p-3 py-12 hover:bg-muted/30",
                isUploading ? "pointer-events-none !cursor-not-allowed opacity-80" : ""
            )}
        >
            <input name="file" multiple={isMulti} {...getInputProps()} disabled={isUploading} />
            <div className="flex flex-col items-center gap-3 text-center !text-[#858585] dark:!text-gray-300">
                <CloudUpload size={48} className="text-gray-600 dark:text-gray-400" />
                <h4 className="!font-normal  !text-[#858585] dark:!text-gray-400">
                    <span className="font-semibold text-black underline dark:text-white">
                        Click to upload
                    </span>{" "}
                    or drag and drop <br />
                    Maximum file size 50 MB.
                </h4>
                {/* <p>Only *.jpeg and *.png images will be accepted</p> */}
                {isUploading ? (
                    <div className="w-full max-w-xs mx-auto mt-4">
                        <Progress
                            value={uploadProgress}
                            className="w-full h-1 bg-zinc-200"
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
};
