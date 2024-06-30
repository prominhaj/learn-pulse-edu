"use client";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

const VideoUploader = () => {
    const [resource, setResource] = useState(null);

    const handleUploadSuccess = (result) => {
        setResource(result?.info);
    };

    const handleOnClick = (open) => {
        open();
    };

    return (
        <div className="mt-4">
            <CldUploadWidget
                uploadPreset="video_upload_learn_pulse_edu"
                options={{
                    sources: ['local'],
                    multiple: false,
                    maxFiles: 1,
                    showPoweredBy: false,
                    maxVideoFileSize: 500000000,
                    clientAllowedFormats: ["video"],
                    public_id: resource ? resource?.public_id : undefined
                }}
                onSuccess={handleUploadSuccess}
            >
                {({ open }) => (
                    <>
                        <Button onClick={() => handleOnClick(open)}>
                            {resource ? 'Update Video' : 'Upload a Video'}
                        </Button>
                        {resource && (
                            <div className="mt-4">
                                <p>Uploaded Video URL: <a href={resource.secure_url} target="_blank" rel="noopener noreferrer">{resource.secure_url}</a></p>
                            </div>
                        )}
                    </>
                )}
            </CldUploadWidget>
        </div >
    );
};

export default VideoUploader;
