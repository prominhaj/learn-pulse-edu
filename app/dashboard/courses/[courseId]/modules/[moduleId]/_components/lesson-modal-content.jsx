import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { IconBadge } from "@/components/globals/IconBadge/IconBadge";
import { LessonTitleForm } from "./lesson-title-form";
import { LessonDescriptionForm } from "./lesson-description-form";
import { LessonAccessForm } from "./lesson-access-form";
import { VideoUrlForm } from "./video-url-form";
import { LessonActions } from "./lesson-actions";

const LessonModalContent = ({ courseId, lesson, moduleId, modalClose, slug }) => {

    return (
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
                        <LessonActions
                            modalClose={modalClose}
                            active={lesson?.active}
                            courseId={courseId}
                            moduleId={moduleId}
                            lessonId={lesson?.id}
                        />
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
                        <LessonTitleForm
                            initialData={{ title: lesson?.title }}
                            lessonId={lesson?.id}
                        />
                        <LessonDescriptionForm
                            initialData={lesson?.description}
                            lessonId={lesson?.id}
                        />
                    </div>
                    <div>
                        <div className='flex items-center gap-x-2'>
                            <IconBadge icon={Eye} />
                            <h2 className='text-xl'>Access Settings</h2>
                        </div>
                        <LessonAccessForm
                            initialData={{ isFree: lesson?.access !== 'private' }}
                            lessonId={lesson?.id}
                        />
                    </div>
                </div>
                <div>
                    <div className='flex items-center gap-x-2'>
                        <IconBadge icon={Video} />
                        <h2 className='text-xl'>Add a video</h2>
                    </div>
                    <VideoUrlForm
                        initialData={lesson || ""}
                        lessonId={lesson?.id}
                        slug={slug}
                    />
                </div>
            </div>
        </div>
    );
};

export default LessonModalContent;