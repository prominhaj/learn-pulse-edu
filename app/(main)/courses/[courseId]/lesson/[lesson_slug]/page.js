import { Button } from '@/components/ui/button';
import { VideoPlayer } from './_components/video-player';
import VideoDescription from './_components/video-description';
import { getLessonBySlug } from '@/queries/lesson';

const Course = async ({ params: { courseId, lesson_slug } }) => {
    const lessonSlug = lesson_slug.replace(/-/g, 0);
    const lesson = await getLessonBySlug(lessonSlug);
    console.log(lesson);
    return (
        <>
            <div className='flex flex-col'>
                <div className='w-full'>
                    <VideoPlayer url={lesson?.video?.url} />
                </div>
                <div>
                    <div className='flex flex-col items-center justify-between py-3 md:py-4 md:flex-row'>
                        <h2 className='mb-2 text-xl font-semibold md:text-2xl'>{lesson?.title}</h2>
                        <div className='flex items-center gap-3'>
                            <Button className='h-7 md:h-auto' variant='outline'>
                                Back
                            </Button>
                            <Button className='h-7 md:h-auto'>Next</Button>
                        </div>
                    </div>
                    {/* <Separator /> */}
                    <VideoDescription description={lesson?.description} />
                </div>
            </div>
        </>
    );
};
export default Course;
