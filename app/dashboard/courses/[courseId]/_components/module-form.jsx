"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ModuleList } from "./module-list";
import { createModule, reOrderModules } from "@/app/actions/module";
import { courseCreateModuleSchema } from "@/lib/FormValidation/course/courseSchema";
import { getSlug } from "@/lib/convertData";

export const ModulesForm = ({ initialData, courseId }) => {
  // const [modules, setModules] = useState(initialData);
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

  const onSubmit = async (values) => {
    try {

      const formData = new FormData();
      formData.append("title", values?.title);
      formData.append("slug", getSlug(values?.title));
      formData.append("courseId", courseId);
      formData.append("order", initialData?.length);

      await createModule(formData);
      // setModules((modules) => [
      //   ...modules,
      //   {
      //     id: resModule?._id.toString(),
      //     title: values.title,
      //   },
      // ]);

      router.refresh();
      toast.success("Module has been created");
      toggleCreating();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onReorder = async (updateData) => {
    try {
      reOrderModules(updateData);
      setIsUpdating(true);
      router.refresh();
      toast.success("Chapters reordered");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id) => {
    router.push(`/dashboard/courses/${courseId}/modules/${id}`);
  };

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

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
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
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.length && "text-slate-500 dark:text-slate-400 italic"
          )}
        >
          {!initialData?.length && "No module"}
          <ModuleList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData || []}
          />
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
