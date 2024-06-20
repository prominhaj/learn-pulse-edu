"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { coursePriceSchema } from "@/lib/FormValidation/course/courseSchema";
import { updateCourse } from "@/app/actions/course";

export const PriceForm = ({ initialData, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const form = useForm({
    resolver: zodResolver(coursePriceSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // Handle form submission
  const onSubmit = useCallback(async (values) => {
    try {
      await updateCourse(courseId, values);
      router.refresh();
      toast.success("Price has been updated");
      toggleEdit();
    } catch (error) {
      toast.error("Failed to update price");
    }
  }, [courseId, router, toggleEdit]);

  return (
    <div className="p-4 mt-6 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between font-medium">
        Course Price
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit Price
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p className={cn("text-sm mt-2", !initialData?.price && "text-slate-500 italic")}>
          {initialData?.price ? formatPrice(initialData?.price) : "No price"}
        </p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      disabled={isSubmitting}
                      placeholder="Set a price for your course"
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
