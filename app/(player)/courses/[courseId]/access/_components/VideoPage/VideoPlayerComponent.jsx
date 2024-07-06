import { findLessonByModule } from '@/queries/module';
import { VideoPlayer } from '../video-player';
import { getLessonById } from '@/queries/lesson';

const VideoPlayerComponent = async ({ courseId, lessonId }) => {
    const lesson = await getLessonById(lessonId);
    const findModule = await findLessonByModule(lesson.id);

    return (
        <>
            <VideoPlayer
                courseId={courseId}
                lessonId={lesson.id}
                moduleId={findModule?._id.toString()}
                video={lesson?.video}
            />
        </>
    );
};

export default VideoPlayerComponent;
