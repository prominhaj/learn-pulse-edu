import { Suspense } from 'react';
import { getLessonById } from '@/queries/lesson';
import VideoPlayerComponent from '../_components/VideoPage/VideoPlayerComponent';
import VideoDescription from '../_components/video-description';
import NotFound from '../_components/NotFound';
import NextAndPrevButton from '../_components/VideoPage/NextAndPrevButton';

const Course = async ({ params: { courseId }, searchParams: { lesson } }) => {
    const getLesson = await getLessonById(lesson);

    if (!getLesson) {
        return <NotFound name='Lesson' />;
    }

    return (
        <>
            <div className='flex flex-col'>
                <div className='w-full'>
                    <Suspense fallback={<div className='text-center'>Video Loading...</div>}>
                        <VideoPlayerComponent courseId={courseId} lessonId={lesson} />
                    </Suspense>
                </div>
                <div>
                    <div className='flex flex-col items-center justify-between py-3 md:py-4 md:flex-row'>
                        <h2 className='mb-2 text-xl font-semibold md:text-2xl'>
                            {getLesson.title}
                        </h2>
                        <NextAndPrevButton lesson={lesson} courseId={courseId} />
                    </div>
                    <VideoDescription description={getLesson.description} />
                </div>
            </div>
        </>
    );
};

export default Course;
