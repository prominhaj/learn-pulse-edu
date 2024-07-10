"use client";
import Spinner from "@/components/globals/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const DownloadCertificate = ({ courseProgress, courseId }) => {
    const [isCertificateDownloading, setIsCertificateDownloading] =
        useState(false);

    async function handleCertificateDownload() {
        setIsCertificateDownloading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certificate?courseId=${courseId}`);
            if (!response.ok) {
                throw new Error('Failed to download certificate');
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Certificate.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            toast.success("Certificate has been downloaded");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsCertificateDownloading(false);
        }
    }

    return (
        <Button
            onClick={handleCertificateDownload}
            disabled={courseProgress !== 100 || isCertificateDownloading}
            className="w-full disabled:bg-opacity-50 disabled:cursor-not-allowed"
        >
            {isCertificateDownloading ? <><Spinner /> Certificate Downloading...</> : "Download Certificate"}
        </Button>
    );
};

export default DownloadCertificate;
