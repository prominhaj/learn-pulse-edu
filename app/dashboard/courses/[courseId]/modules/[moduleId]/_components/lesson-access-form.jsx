"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateLesson } from "@/app/actions/lesson";
import { lessonAccessSchema } from "@/lib/FormValidation/lesson/lesson";

export const LessonAccessForm = ({ initialData, lessonId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);

  const form = useForm({
    resolver: zodResolver(lessonAccessSchema),
    defaultValues: {
      isFree: !!initialData?.isFree,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = useCallback(async (values) => {
    try {
      const payload = {
        access: values.isFree ? "public" : "private",
      };
      await updateLesson(lessonId, payload);
      router.refresh();
      toast.success("Lesson updated");
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [lessonId, router, toggleEdit]);

  return (
    <div className="p-4 mt-6 bg-gray-100 border rounded-md dark:bg-gray-800/70 dark:border-gray-700">
      <div className="flex items-center justify-between font-medium">
        Lesson access
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? "Cancel" : <><Pencil className="w-4 h-4 mr-2" /> Edit access</>}
        </Button>
      </div>
      {!isEditing ? (
        <p className={cn("text-sm mt-2", !initialData?.isFree && "text-slate-500 italic")}>
          {initialData?.isFree ? "This chapter is free for preview" : "This chapter is not free"}
        </p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md dark:border-gray-700">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check this box if you want to make this chapter free for preview
                    </FormDescription>
                  </div>
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
