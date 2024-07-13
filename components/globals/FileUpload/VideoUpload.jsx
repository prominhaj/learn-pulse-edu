"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CloudUploadIcon, File } from "lucide-react";
import Spinner from "../Spinner/Spinner";

const VideoUpload = ({ progressValue, setFile, file, uploadAction, pending, isImage }) => {
    const fileSize = parseFloat(file?.size / (1024 * 1024)).toFixed(2);

    return (
        <div className="w-full">
            <div className="mb-3">
                {
                    file ? (
                        <div className="flex flex-col items-center justify-center gap-2 p-8 transition-colors border rounded-md hover:bg-muted bg-muted/50 border-background">
                            <File className="w-8 h-8 text-muted-foreground" />
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-sm">{file.name}</p>
                                <p className="text-muted-foreground">
                                    {fileSize} MB
                                </p>
                                <Button
                                    disabled={pending}
                                    variant="destructive"
                                    onClick={() => setFile(null)} size="sm"
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <input
                                onChange={e => setFile(e.target.files[0])}
                                id="video-file"
                                name="file"
                                type="file"
                                accept={isImage ? "image/*" : "video/*"}
                                multiple={false}
                                className="hidden"
                            />
                            <div className="grid gap-4">
                                <div className="flex flex-col items-center justify-center gap-2 p-8 transition-colors border rounded-md hover:bg-muted bg-muted/50 border-background">
                                    <CloudUploadIcon className="w-8 h-8 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        Drag and drop a {isImage ? "image" : "video"} file or click to select one
                                    </p>
                                    <label
                                        htmlFor="video-file"
                                        className="inline-flex items-center justify-center text-sm font-medium transition-colors border rounded-md shadow-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground px-3 py-1.5 cursor-pointer"
                                    >
                                        Select File
                                    </label>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
            <div className="space-y-2">
                {
                    progressValue > 0 && (
                        <div className="w-full space-y-1">
                            <Progress value={progressValue || 0} />
                            <p className="text-xs text-center text-muted-foreground">{progressValue || 0}% uploaded</p>
                        </div>
                    )
                }
                <form onSubmit={uploadAction}>
                    <Button
                        type="submit"
                        disabled={pending || !file}
                        variant="primary"
                        className="w-full"
                    >
                        {pending && <Spinner className="!text-white !dark:text-white !fill-red-500 dark:!fill-red-500" />} Upload {isImage ? "Image" : "Video"}
                    </Button>
                </form>
            </div>
        </div>
    )
};

export default VideoUpload;