"use client";
import { Button } from "@/components/ui/button";
import { ReviewModal } from "../review-modal";
import { useState } from "react";
import DownloadCertificate from "./DownloadCertificate";

const CourseActions = ({ courseProgress, courseId }) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    return (
        <>
            <DownloadCertificate courseProgress={courseProgress} courseId={courseId} />
            <Button
                onClick={() => setIsReviewModalOpen(true)}
                variant="outline"
                className="w-full"
            >
                Give Review
            </Button>
            <ReviewModal open={isReviewModalOpen} setOpen={setIsReviewModalOpen} />
        </>
    );
};

export default CourseActions;