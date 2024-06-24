"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { quizSetSchema } from "@/lib/FormValidation/course/courseSchema";
import { updateCourseQuizSet } from "@/app/actions/course";


export const QuizSetForm = ({
  initialData,
  selectedQuizSetTitle,
  courseId,
  options
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = useCallback(() => {
    setIsEditing((current) => !current);
  }, []);

  const form = useForm({
    resolver: zodResolver(quizSetSchema),
    defaultValues: {
      quizSetId: initialData || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = useCallback(async (values) => {
    try {
      await updateCourseQuizSet(courseId, values);
      toast.success("Quiz Set updated");
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [toggleEdit, courseId]);

  return (
    <div className="p-4 mt-6 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between font-medium">
        Quiz Set
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit Quiz Set
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !selectedQuizSetTitle && "text-slate-500 italic"
          )}
        >
          {selectedQuizSetTitle ? selectedQuizSetTitle : "No quiz set selected"}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="quizSet"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
