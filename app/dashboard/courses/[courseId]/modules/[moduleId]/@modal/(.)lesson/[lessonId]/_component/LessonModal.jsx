"use client";

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react';
import { IconBadge } from '@/components/globals/IconBadge/IconBadge';
import { CourseActions } from '@/app/dashboard/courses/[courseId]/_components/course-action';
import { VideoUrlForm } from '../../../../_components/video-url-form';
import { LessonTitleForm } from '../../../../_components/lesson-title-form';
import { LessonDescriptionForm } from '../../../../_components/lesson-description-form';
import { LessonAccessForm } from '../../../../_components/lesson-access-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LessonModal = ({ courseId }) => {
    const router = useRouter();

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={() => router.back()}>
            <DialogContent
                className='sm:max-w-[1200px] w-[96%] overflow-y-auto max-h-[90vh]'
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <div>
                    <div className='flex items-center justify-between'>
                        <div className='w-full'>
                            <Link
                                href={`/dashboard/courses/${courseId}`}
                                className='flex items-center mb-6 text-sm transition hover:opacity-75'
                            >
                                <ArrowLeft className='w-4 h-4 mr-2' />
                                Back to course setup
                            </Link>
                            <div className='flex items-center justify-end'>
                                <CourseActions />
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-6 mt-16 md:grid-cols-2'>
                        <div className='space-y-4'>
                            <div>
                                <div className='flex items-center gap-x-2'>
                                    <IconBadge icon={LayoutDashboard} />
                                    <h2 className='text-xl'>Customize Your chapter</h2>
                                </div>
                                <LessonTitleForm initialData={{}} courseId={'1'} lessonId={'1'} />
                                <LessonDescriptionForm
                                    initialData={{}}
                                    courseId={'1'}
                                    lessonId={'1'}
                                />
                            </div>
                            <div>
                                <div className='flex items-center gap-x-2'>
                                    <IconBadge icon={Eye} />
                                    <h2 className='text-xl'>Access Settings</h2>
                                </div>
                                <LessonAccessForm initialData={{}} courseId={'1'} chapterId={'1'} />
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <IconBadge icon={Video} />
                                <h2 className='text-xl'>Add a video</h2>
                            </div>
                            <VideoUrlForm
                                initialData={{
                                    url: 'https://www.youtube.com/embed/Cn4G2lZ_g2I?si=8FxqU8_NU6rYOrG1'
                                }}
                                courseId={1}
                                lessonId={1}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LessonModal;