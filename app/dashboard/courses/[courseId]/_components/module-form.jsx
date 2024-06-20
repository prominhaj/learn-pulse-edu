"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSlug } from "@/lib/convertData";
import { createModule, reOrderModules } from "@/app/actions/module";
import { courseCreateModuleSchema } from "@/lib/FormValidation/course/courseSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ModuleList } from "./module-list";

export const ModulesForm = ({ initialData, courseId }) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const form = useForm({
    resolver: zodResolver(courseCreateModuleSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = useCallback(async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values?.title);
      formData.append("slug", getSlug(values?.title));
      formData.append("courseId", courseId);
      formData.append("order", initialData?.length);

      await createModule(formData);

      router.refresh();
      toast.success("Module has been created");
      toggleCreating();
    } catch (error) {
      toast.error(error.message);
    }
  }, [router, courseId, initialData]);

  const onReorder = useCallback(async (updateData) => {
    try {
      setIsUpdating(true);
      await reOrderModules(updateData);
      router.refresh();
      toast.success("Chapters reordered");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  }, [router]);

  const onEdit = useCallback((id) => {
    router.push(`/dashboard/courses/${courseId}/modules/${id}`);
  }, [router, courseId]);

  return (
    <div className="relative p-4 mt-6 bg-gray-100 border rounded-md dark:bg-gray-800/70 dark:border-gray-700">
      {isUpdating && (
        <div className="absolute top-0 right-0 flex items-center justify-center w-full h-full rounded-md bg-gray-500/20">
          <Loader2 className="w-6 h-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Course Modules
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add a module
            </>
          )}
        </Button>
      </div>

      {isCreating ? (
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
      ) : (
        <>
          {!initialData?.length && (
            <div className="mt-2 text-sm italic text-slate-500 dark:text-slate-400">
              No module
            </div>
          )}
          <ModuleList onEdit={onEdit} onReorder={onReorder} items={initialData || []} />
          <p className="mt-4 text-xs text-muted-foreground">
            Drag & Drop to reorder the modules
          </p>
        </>
      )}
    </div>
  );
};
