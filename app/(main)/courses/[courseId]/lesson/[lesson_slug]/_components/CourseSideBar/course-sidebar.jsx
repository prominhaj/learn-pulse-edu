"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReviewModal } from "../review-modal";
import { CourseProgress } from "@/components/globals/CourseProgress/CourseProgress";
import CourseModules from "./CourseModules";

export const CourseSidebar = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col border shadow-sm">
        <div className="flex flex-col p-3 border-b sm:p-6">
          <h1 className="text-base font-semibold">Reactive Accelerator</h1>
          {/* Check purchase */}
          {
            <div className="mt-3">
              <CourseProgress variant="success" value={80} />
            </div>
          }
        </div>

        <CourseModules />

        <div className="px-3 py-3 space-y-3 sm:px-6">
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
        </div>
      </div>
      <ReviewModal open={isReviewModalOpen} setOpen={setIsReviewModalOpen} />
    </>
  );
};
