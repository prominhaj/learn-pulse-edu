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
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { courseModuleUpdateSchema } from "@/lib/FormValidation/course/courseSchema";
import { updateModule } from "@/app/actions/module";
import { getSlug } from "@/lib/convertData";

export const ModuleTitleForm = ({ initialData, courseId, chapterId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(courseModuleUpdateSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      values["slug"] = getSlug(values?.title);
      await updateModule(chapterId, values);
      router.refresh();
      toast.success("Module title updated");
      toggleEdit();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-4 mt-6 bg-gray-100 border rounded-md dark:bg-gray-800/70 dark:border-gray-700">
      <div className="flex items-center justify-between font-medium">
        Module title
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit Title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="mt-2 text-sm">{initialData?.title}</p>}
      {isEditing && (
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
                      placeholder="e.g. 'Introduction to the course'"
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
