"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReviewModal } from "../review-modal";

const CourseRating = ({ courseId, userId }) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    return (
        <div>
            <Button
                onClick={() => setIsReviewModalOpen(true)}
                variant="outline"
                className="w-full"
            >
                Give Review
            </Button>
            <ReviewModal
                open={isReviewModalOpen}
                setOpen={setIsReviewModalOpen}
                courseId={courseId}
                userId={userId}
            />
        </div>
    );
};

export default CourseRating;