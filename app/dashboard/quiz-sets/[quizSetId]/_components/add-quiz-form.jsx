"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { addQuizFormSchema } from "@/lib/FormValidation/quiz/quiz";
import { QuizOption } from "./quiz-option";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getSlug } from "@/lib/convertData";
import { createAndUpdateQuiz } from "@/app/actions/quiz";
import { useRouter } from "next/navigation";
import Loading from "@/components/globals/Loading/Loading";
import Spinner from "@/components/globals/Spinner/Spinner";

export const AddQuizForm = ({ quizSetId, editQuiz }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Function to determine correct option based on editQuiz
  const getCorrectOption = (editQuiz) => {
    const correctOptionEdit = editQuiz?.options.reduce((acc, option, index) => {
      if (option.is_correct) {
        switch (index) {
          case 0:
            acc.push("optionA");
            break;
          case 1:
            acc.push("optionB");
            break;
          case 2:
            acc.push("optionC");
            break;
          case 3:
            acc.push("optionD");
            break;
          default:
            break;
        }
      }
      return acc;
    }, []);

    return correctOptionEdit?.toString() || "";
  };

  // Initial quiz data based on editQuiz
  const initialQuizData = useMemo(() => ({
    title: editQuiz?.question || "",
    description: editQuiz?.description || "",
    optionA: {
      text: editQuiz?.options[0]?.text || "",
      is_correct: editQuiz?.options[0]?.is_correct || false,
    },
    optionB: {
      text: editQuiz?.options[1]?.text || "",
      is_correct: editQuiz?.options[1]?.is_correct || false,
    },
    optionC: {
      text: editQuiz?.options[2]?.text || "",
      is_correct: editQuiz?.options[2]?.is_correct || false,
    },
    optionD: {
      text: editQuiz?.options[3]?.text || "",
      is_correct: editQuiz?.options[3]?.is_correct || false,
    },
    correctOption: getCorrectOption(editQuiz) || "",
    mark: editQuiz?.mark || 5,
  }), [editQuiz]);

  // Form hook initialization
  const form = useForm({
    resolver: zodResolver(addQuizFormSchema),
    mode: "onBlur",
    defaultValues: initialQuizData,
  });

  useEffect(() => {
    form.reset(initialQuizData);
  }, [editQuiz, initialQuizData, form]);

  const { isSubmitting } = form.formState;

  // Form submission handler
  const onSubmit = useCallback(async (values) => {
    setLoading(true)
    try {
      const structuredQuiz = {
        question: values.title,
        slug: getSlug(values.title),
        description: values.description,
        options: [
          values.optionA,
          values.optionB,
          values.optionC,
          values.optionD,
        ],
        mark: values.mark,
      };

      if (editQuiz?.id) {
        // Update Quiz
        await createAndUpdateQuiz(structuredQuiz, quizSetId, editQuiz?.id);
        toast.success("Quiz updated successfully");
        form.reset();
        router.push(`/dashboard/quiz-sets/${quizSetId}`)
      }
      else {
        // Create Quiz
        await createAndUpdateQuiz(structuredQuiz, quizSetId);
        toast.success("Quiz created successfully");
        form.reset();
      }

    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setLoading(false)
    }
  }, [form, quizSetId, editQuiz, router]);

  // Watch correctOption value changes
  const correctOption = form.watch("correctOption");

  // Handle correctOption change
  const handleCorrectOptionChange = useCallback((option) => {
    form.setValue("optionA.is_correct", option === "optionA");
    form.setValue("optionB.is_correct", option === "optionB");
    form.setValue("optionC.is_correct", option === "optionC");
    form.setValue("optionD.is_correct", option === "optionD");
    form.setValue("correctOption", option);
  }, [form]);

  return (
    <div className="p-4 mt-6 border rounded-md dark:border-neutral-800 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between font-medium">
        Add New Quiz
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
          {/* Quiz Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quiz Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Enter quiz question"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quiz Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quiz Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="Enter quiz description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mark */}
          <FormField
            control={form.control}
            name="mark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mark</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={isSubmitting}
                    placeholder="Enter mark for the quiz"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* RadioGroup for selecting correct option */}
          <RadioGroup value={correctOption} onValueChange={handleCorrectOptionChange}>
            {["optionA", "optionB", "optionC", "optionD"].map((option) => (
              <QuizOption
                key={option}
                form={form}
                name={option}
                isSubmitting={isSubmitting}
                value={correctOption}
                onChange={handleCorrectOptionChange}
              />
            ))}
          </RadioGroup>

          {/* Display error message if correctOption is not selected */}
          {form.formState.errors.correctOption && (
            <p className="text-red-500">
              <small>
                {form.formState.errors.correctOption.message}
              </small>
            </p>
          )}

          {/* Submit button */}
          <div className="flex items-center justify-end gap-x-2">
            <Button type="submit" className="w-full" disabled={loading || isSubmitting}>
              {loading && <Spinner />}  Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
