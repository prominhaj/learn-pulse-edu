"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LessonList } from "./lesson-list";
import { createModuleLessonSchema } from "@/lib/FormValidation/course/courseSchema";
import { getSlug } from "@/lib/convertData";
import { createLesson, reOrderLesson } from "@/app/actions/lesson";

export const LessonForm = ({ initialData, moduleId, courseId }) => {
  const [lessons, setLessons] = useState(initialData);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  const toggleCreating = useCallback(() => setIsCreating((prev) => !prev), []);

  const form = useForm({
    resolver: zodResolver(createModuleLessonSchema),
    defaultValues: { title: "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = useCallback(async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("moduleId", moduleId);
      formData.append("order", lessons.length);
      formData.append("slug", getSlug(values.title));

      const lesson = await createLesson(formData);

      setLessons((prevLessons) => [
        ...prevLessons,
        {
          id: lesson._id,
          title: values.title,
        },
      ]);

      toast.success("Lesson created");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  }, [lessons.length, moduleId, router, toggleCreating]);

  const onReorder = useCallback(async (updateData) => {
    try {
      await reOrderLesson(updateData);
      setIsUpdating(true);
      router.refresh();
      toast.success("Lesson reordered");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  }, [router]);

  return (
    <div className="relative p-4 mt-6 bg-gray-100 border rounded-md dark:bg-gray-800/70 dark:border-gray-700">
      {isUpdating && (
        <div className="absolute top-0 right-0 flex items-center justify-center w-full h-full rounded-md bg-gray-500/20">
          <Loader2 className="w-6 h-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Module Lessons
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? "Cancel" : <>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add a chapter
          </>}
        </Button>
      </div>

      {isCreating && (
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
                      placeholder="e.g. 'Introduction to the course...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div className={cn("text-sm mt-2", !lessons.length && "text-slate-500 italic")}>
          {!lessons.length ? "No module" : (
            <LessonList
              courseId={courseId}
              moduleId={moduleId}
              onReorder={onReorder}
              items={lessons}
            />
          )}
        </div>
      )}
      {!isCreating && (
        <p className="mt-4 text-xs text-muted-foreground">
          Drag & Drop to reorder the modules
        </p>
      )}
    </div>
  );
};
