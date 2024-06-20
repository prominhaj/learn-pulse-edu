"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateLesson } from "@/app/actions/lesson";
import { lessonDescriptionSchema } from "@/lib/FormValidation/lesson/lesson";

export const LessonDescriptionForm = ({ initialData, lessonId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);

  const form = useForm({
    resolver: zodResolver(lessonDescriptionSchema),
    defaultValues: {
      description: initialData || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = useCallback(
    async (values) => {
      try {
        await updateLesson(lessonId, values);
        router.refresh();
        toast.success("Lesson description updated");
        toggleEdit();
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [lessonId, router, toggleEdit]
  );

  return (
    <div className="p-4 mt-6 bg-gray-100 border rounded-md dark:bg-gray-800/70 dark:border-gray-700">
      <div className="flex items-center justify-between font-medium">
        Chapter Description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? "Cancel" : <><Pencil className="w-4 h-4 mr-2" /> Edit Description</>}
        </Button>
      </div>
      {!isEditing ? (
        <div className={cn("text-sm mt-2", !initialData && "text-slate-500 italic")}>
          {initialData ? <p className="mt-2 text-sm">{initialData}</p> : "No description available"}
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Type your description here..."
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
