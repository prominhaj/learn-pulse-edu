"use client";
import { Trash } from "lucide-react";
import { SubmitActionBtn } from "./submit-action-btn";
import { toast } from "sonner";
import { coursePublished } from "@/app/actions/course";
import { useRouter } from "next/navigation";

export const CourseActions = ({ active, courseId }) => {
  const router = useRouter();

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
    try {

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <form action={handlePublishCourse}>
        <SubmitActionBtn variant="outline">
          {active ? "UnPublish" : "Publish"}
        </SubmitActionBtn>
      </form>

      <form action={handleCourseDelete}>
        <SubmitActionBtn>
          <Trash className="w-4 h-4" />
        </SubmitActionBtn>
      </form>
    </div>
  );
};