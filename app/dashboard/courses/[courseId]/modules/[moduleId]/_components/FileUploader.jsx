"use client";

import AllUploadFiles from "@/components/globals/FileUpload/AllUploadFiles";
import VideoUpload from "@/components/globals/FileUpload/VideoUpload";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const FileUploader = () => {
    const [files, setFiles] = useState([]);

    return (
        <Card className="p-5">
            <AllUploadFiles files={files} setFiles={setFiles} />
            <VideoUpload setFiles={setFiles} />
        </Card>
    );
};

export default FileUploader;