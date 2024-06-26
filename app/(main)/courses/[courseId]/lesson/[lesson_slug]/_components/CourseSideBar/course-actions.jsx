"use client";
import { Button } from "@/components/ui/button";
import { ReviewModal } from "../review-modal";
import { useState } from "react";

const CourseActions = () => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    return (
        <>
            <Button className="w-full">
                <>Download Certificate</>
            </Button>

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