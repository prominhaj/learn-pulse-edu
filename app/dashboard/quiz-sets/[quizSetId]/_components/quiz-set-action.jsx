"use client";
import { Trash } from "lucide-react";
import { SubmitActionBtn } from "@/app/dashboard/_components/submit-action-btn";
import { useCallback } from "react";
import { deleteQuizSet, quizSetPublished } from "@/app/actions/quizSet";
import { toast } from "sonner";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const QuizSetAction = ({ active = false, quizSetId }) => {
  const router = useRouter();

  // Handle Publish
  const handlePublished = useCallback(async () => {
    try {
      await quizSetPublished(quizSetId)
      toast.success(`${active ? "Unpublished" : "Published"} Successfully!`)
    } catch (error) {
      toast.error(error.message)
    }
  }, [active, quizSetId]);

  // Handle Delete
  const handleDelete = useCallback(async () => {
    try {
      await deleteQuizSet(quizSetId)
      toast.success("Quiz Set Deleted Successfully!")
      router.push("/dashboard/quiz-sets")
    } catch (error) {
      toast.error(error.message)
    }
  }, [quizSetId, router])

  return (
    <div className="flex items-center gap-x-2">
      <form action={handlePublished}>
        <SubmitActionBtn variant="outline">
          {active ? "Unpublish" : "Publish"}
        </SubmitActionBtn>
      </form>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm">
            <Trash className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={handleDelete}>
              <SubmitActionBtn className="flex items-center gap-2" variant="destructive">
                <Trash className="w-4 h-4" />
                Delete
              </SubmitActionBtn>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
