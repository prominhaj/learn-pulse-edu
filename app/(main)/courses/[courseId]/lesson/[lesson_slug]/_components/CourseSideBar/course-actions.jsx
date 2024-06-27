"use client";
import { Button } from "@/components/ui/button";
import { ReviewModal } from "../review-modal";
import { useState } from "react";

const CourseActions = ({ courseProgress }) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    return (
        <>
            <Button disabled={courseProgress === 100 ? false : true} className="w-full disabled:bg-opacity-50">
                Download Certificate
            </Button >
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