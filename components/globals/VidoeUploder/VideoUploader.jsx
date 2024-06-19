"use client";
import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react";

const VideoUploader = () => {
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(0)

    const handleDragOver = (e) => {
        e.preventDefault()
    }
    const handleDrop = (e) => {
        e.preventDefault()
        setFile(e.dataTransfer.files[0])
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    // Handle Upload Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div

                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="relative flex items-center justify-center h-32 transition-colors border border-dashed rounded-lg border-muted-foreground hover:border-primary"
            >
                {file ? (
                    <div className="text-center">
                        <Button onClick={() => setFile(null)} className="absolute z-20 top-1 right-1" size="sm">
                            <Trash className="w-4 h-4" />
                        </Button>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-muted-foreground">{file.type}</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <UploadIcon className="w-8 h-8 text-muted-foreground" />
                        <p className="mt-2 text-muted-foreground">Drag and drop a video file or click to select</p>
                    </div>
                )}
                <input
                    type="file"
                    accept="video/*"
                    disabled={file}
                    className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                />
            </div>
            <div className="grid gap-2">
                <Progress value={progress} />
                <Button type="submit" disabled={!file}>
                    Upload Video
                </Button>
            </div>
        </form>
    )
}

const UploadIcon = (props) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    )
}

export default VideoUploader;