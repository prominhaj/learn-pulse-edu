import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getCourseByCourseId } from '@/queries/courses';
import { Suspense } from 'react';
import { getLessonById } from '@/queries/lesson';
import VideoPlayerComponent from '../_components/VideoPage/VideoPlayerComponent';
import VideoDescription from '../_components/video-description';

const Course = async ({ params: { courseId }, searchParams: { lesson } }) => {
    const getLesson = await getLessonById(lesson);

    if (!getLesson) {
        return <div>Lesson not found</div>;
    }

    const course = await getCourseByCourseId(courseId);

    if (!course) {
        return <div>Course not found</div>;
    }

    const allLessons = course?.modules?.reduce(
        (lessons, module) => lessons.concat(module.lessonIds),
        []
    );
    const currentLessonIndex = allLessons?.findIndex(
        (lessons) => lessons?._id?.toString() === lesson
    );

    const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
    const nextLesson =
        currentLessonIndex < allLessons?.length - 1 ? allLessons[currentLessonIndex + 1] : null;

    const prevLessonId = prevLesson?._id.toString() ?? null;
    const nextLessonId = nextLesson?._id.toString() ?? null;

    return (
        <div className='flex flex-col'>
            <div className='w-full'>
                <Suspense fallback={<div className='text-center'>Video Loading...</div>}>
                    <VideoPlayerComponent courseId={courseId} lessonId={lesson} />
                </Suspense>
            </div>
            <div>
                <div className='flex flex-col items-center justify-between py-3 md:py-4 md:flex-row'>
                    <h2 className='mb-2 text-xl font-semibold md:text-2xl'>{getLesson.title}</h2>
                    <div className='flex items-center gap-3'>
                        <Link
                            href={
                                prevLessonId
                                    ? `/courses/${courseId}/access?lesson=${prevLessonId}`
                                    : '#'
                            }
                            className={cn(
                                buttonVariants({ variant: 'secondary' }),
                                !prevLessonId && 'bg-opacity-50 opacity-50 cursor-not-allowed',
                                'h-7 md:h-auto rounded-3xl'
                            )}
                        >
                            Back
                        </Link>
                        <Link
                            href={
                                nextLessonId
                                    ? `/courses/${courseId}/access?lesson=${nextLessonId}`
                                    : '#'
                            }
                            className={cn(
                                buttonVariants({ variant: 'primary' }),
                                !nextLessonId && 'bg-opacity-50 opacity-50 cursor-not-allowed',
                                'h-7 md:h-auto rounded-3xl'
                            )}
                        >
                            Next
                        </Link>
                    </div>
                </div>
                <VideoDescription description={getLesson.description} />
            </div>
        </div>
    );
};

export default Course;
