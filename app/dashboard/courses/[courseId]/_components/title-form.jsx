"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { updateCourse } from "@/app/actions/course";
import { courseTitleSchema } from "@/lib/FormValidation/course/courseSchema";
import { toast } from "sonner";

export const TitleForm = ({ initialData = {}, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = useCallback(() => setIsEditing((prev) => !prev), []);

  const form = useForm({
    resolver: zodResolver(courseTitleSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = useCallback(async (values) => {
    try {
      await updateCourse(courseId, values);
      router.refresh();
      toast.success("Title has been updated");
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [courseId, router, toggleEdit]);

  return (
    <div className="p-4 mt-6 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between font-medium">
        <span>Course Title</span>
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? "Cancel" : <>
            <Pencil className="w-4 h-4 mr-2" />
            Edit Title
          </>}
        </Button>
      </div>
      {!isEditing ? (
        <p className="mt-2 text-sm">{initialData.title}</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
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
