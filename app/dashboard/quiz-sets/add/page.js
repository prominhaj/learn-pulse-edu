'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { toast } from 'sonner';
import { quizTitleSchema } from '@/lib/FormValidation/quiz/quiz';
import { useCallback } from 'react';
import { createQuizSet } from '@/app/actions/quizSet';
import { getSlug } from '@/lib/convertData';

const AddQuizSet = () => {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(quizTitleSchema),
        defaultValues: {
            title: '',
            description: ''
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = useCallback(
        async (values) => {
            try {
                const formatData = {
                    title: values.title,
                    description: values.description,
                    slug: getSlug(values.title)
                };
                const quizSet = await createQuizSet(formatData);
                router.push(`/dashboard/quiz-sets/${quizSet._id}`);
                toast.success('Quiz Set Created');
            } catch (error) {
                toast.error(error.message);
            }
        },
        [router]
    );

    return (
        <div className='flex h-full max-w-5xl p-6 mx-auto md:items-center md:justify-center'>
            <div className='max-w-full w-[536px]'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-8'>
                        {/* Title */}
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quiz Set Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g 'Reactive Accelerator'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quiz Set Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder='Enter a brief description of the quiz set'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex items-center gap-x-2'>
                            <Link href='/dashboard/quiz-sets'>
                                <Button variant='outline' type='button'>
                                    Cancel
                                </Button>
                            </Link>
                            <Button type='submit' disabled={!isValid || isSubmitting}>
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default AddQuizSet;
