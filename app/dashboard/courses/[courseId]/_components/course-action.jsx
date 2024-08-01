"use client";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { coursePublished, deleteCourse } from "@/app/actions/course";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import Spinner from "@/components/globals/Spinner/Spinner";

export const CourseActions = ({ active, courseId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Handle Publish Course
  const handlePublishCourse = async () => {
    try {
      await coursePublished(courseId)
      router.refresh()
      if (active === true) {
        toast.success("Course Unpublished Successfully")
      }
      else {
        toast.success("Course Published Successfully")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Handle Course Delete
  const handleCourseDelete = async () => {
    if (active === true) {
      toast.error("You can not delete active course")
      return;
    }
    setLoading(true)
    try {
      await deleteCourse(courseId)
      toast.success("Course Deleted Successfully")
      router.push("/dashboard/courses")
    } catch (error) {
      toast.error(error.message)
    }
    finally {
      setLoading(false)
    }
  }


  return (
    <div className="flex items-center gap-x-2">
      <form action={handlePublishCourse}>
        <SubmitButton variant="outline">
          {active ? "UnPublish" : "Publish"}
        </SubmitButton>
      </form>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="default">
            <Trash className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to delete Sati course if you do not want to delete course then cancel
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button disabled={loading} onClick={handleCourseDelete} type="submit" variant="destructive">
              {
                loading && (
                  <Spinner />
                )
              } Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};