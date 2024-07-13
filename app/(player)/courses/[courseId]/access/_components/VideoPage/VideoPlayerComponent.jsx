import { findLessonByModule } from '@/queries/module';
import { getLessonById } from '@/queries/lesson';
import { VideoPlayer } from '@/components/globals/VideoPlayer/VideoPlayer';

const VideoPlayerComponent = async ({ courseId, lessonId }) => {
    const lesson = await getLessonById(lessonId);
    const findModule = await findLessonByModule(lesson.id);

    return (
        <div className='w-full max-h-full h-full sm:h-[20rem] md:h-[22rem] lg:h-[25rem] xl:h-[28.75rem]'>
            <VideoPlayer
                courseId={courseId}
                lessonId={lesson.id}
                moduleId={findModule?._id.toString()}
                isLessonVideo={true}
                url={lesson?.video?.url}
            />
        </div>
    );
};

export default VideoPlayerComponent;
