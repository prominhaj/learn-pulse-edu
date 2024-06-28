import { buttonVariants } from '@/components/ui/button';
import { VideoPlayer } from '../_components/video-player';
import VideoDescription from '../_components/video-description';
import { getLessonBySlug } from '@/queries/lesson';
import { findLessonByModule } from '@/queries/module';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getCourseByCourseId } from '@/queries/courses';

const Course = async ({ params: { courseId, lesson_slug } }) => {
    const lessonSlug = lesson_slug.replace(/-/g, '0');
    const lesson = await getLessonBySlug(lessonSlug);

    if (!lesson) {
        return <div>Lesson not found</div>;
    }

    const findModule = await findLessonByModule(lesson.id);
    const course = await getCourseByCourseId(courseId);

    if (!course) {
        return <div>Course not found</div>;
    }

    const allLessons = course?.modules.reduce(
        (lessons, module) => lessons.concat(module.lessonIds),
        []
    );
    const currentLessonIndex = allLessons?.findIndex(({ slug }) => slug === lessonSlug);

    const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
    const nextLesson =
        currentLessonIndex < allLessons?.length - 1 ? allLessons[currentLessonIndex + 1] : null;

    const prevLessonSlug = prevLesson?.slug.replace(/0/g, '-') ?? null;
    const nextLessonSlug = nextLesson?.slug.replace(/0/g, '-') ?? null;

    return (
        <div className='flex flex-col'>
            <div className='w-full'>
                <VideoPlayer
                    courseId={courseId}
                    lessonId={lesson.id}
                    moduleId={findModule?._id.toString()}
                    url={lesson.video?.url}
                />
            </div>
            <div>
                <div className='flex flex-col items-center justify-between py-3 md:py-4 md:flex-row'>
                    <h2 className='mb-2 text-xl font-semibold md:text-2xl'>{lesson.title}</h2>
                    <div className='flex items-center gap-3'>
                        <Link
                            href={
                                prevLessonSlug
                                    ? `/courses/${courseId}/lesson/${prevLessonSlug}`
                                    : '#'
                            }
                            className={cn(
                                buttonVariants({ variant: 'secondary' }),
                                !prevLessonSlug && 'bg-opacity-50 opacity-50 cursor-not-allowed',
                                'h-7 md:h-auto rounded-3xl'
                            )}
                        >
                            Back
                        </Link>
                        <Link
                            href={
                                nextLessonSlug
                                    ? `/courses/${courseId}/lesson/${nextLessonSlug}`
                                    : '#'
                            }
                            className={cn(
                                buttonVariants({ variant: 'primary' }),
                                !nextLessonSlug && 'bg-opacity-50 opacity-50 cursor-not-allowed',
                                'h-7 md:h-auto rounded-3xl'
                            )}
                        >
                            Next
                        </Link>
                    </div>
                </div>
                <VideoDescription description={lesson.description} />
            </div>
        </div>
    );
};

export default Course;
