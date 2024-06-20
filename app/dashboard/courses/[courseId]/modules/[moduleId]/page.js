import { ArrowLeft, BookOpenCheck, Eye, LayoutDashboard, Video } from 'lucide-react';
import Link from 'next/link';
import { ModuleTitleForm } from './_components/module-title-form';
import { LessonForm } from './_components/lesson-form';
import { IconBadge } from '@/components/globals/IconBadge/IconBadge';
import AlertBanner from '@/components/globals/AlertBanner/AlertBanner';
import { getModuleById } from '@/queries/module';
import { replaceMongoIdInArray } from '@/lib/convertData';
import { ModuleActions } from './_components/module-actions';

const Module = async ({ params: { courseId, moduleId } }) => {
    const getModule = await getModuleById(moduleId);
    const lessons = replaceMongoIdInArray(getModule?.lessonIds).sort((a, b) => a?.order - b?.order);

    return (
        <>
            <AlertBanner
                label='This module is unpublished. It will not be visible in the course.'
                variant='warning'
            />

            <div className='p-6'>
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
                            <ModuleActions
                                active={getModule?.active}
                                courseId={courseId}
                                moduleId={moduleId}
                            />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-6 mt-16 md:grid-cols-2'>
                    <div className='space-y-4'>
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <IconBadge icon={LayoutDashboard} />
                                <h2 className='text-xl'>Customize Your module</h2>
                            </div>
                            <ModuleTitleForm
                                initialData={{ title: getModule?.title }}
                                courseId={courseId}
                                chapterId={moduleId}
                            />
                        </div>
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <IconBadge icon={BookOpenCheck} />
                                <h2 className='text-xl'>Module Lessons</h2>
                            </div>
                            <LessonForm
                                initialData={lessons || []}
                                moduleId={moduleId}
                                courseId={courseId}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-x-2'>
                            {/* <IconBadge icon={Video} />
                            <h2 className='text-xl'>Add a video</h2> */}
                        </div>
                        {/* <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Module;
