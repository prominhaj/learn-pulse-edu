"use client";
import { Trash } from "lucide-react";
import { SubmitActionBtn } from "@/app/dashboard/_components/submit-action-btn";
import { useCallback } from "react";
import { quizSetPublished } from "@/app/actions/quizSet";
import { toast } from "sonner";

export const QuizSetAction = ({ active = false, quizSetId }) => {
  // Handle Publish
  const handlePublished = useCallback(async () => {
    try {
      await quizSetPublished(quizSetId)
      toast.success(`${active ? "Unpublished" : "Published"} Successfully!`)
    } catch (error) {
      toast.error(error.message)
    }
  }, [active, quizSetId])

  return (
    <div className="flex items-center gap-x-2">
      <form action={handlePublished}>
        <SubmitActionBtn variant="outline">
          {active ? "Unpublish" : "Publish"}
        </SubmitActionBtn>
      </form>

      <form action="">
        <SubmitActionBtn>
          <Trash className="w-4 h-4" />
        </SubmitActionBtn>
      </form>
    </div>
  );
};
