import { getLesson } from '@/queries/lesson';
import LessonModal from './_component/LessonModal';

const LessonModalPage = async ({ params: { lessonId, moduleId, courseId } }) => {
    const lesson = await getLesson(lessonId);

    return (
        <>
            <LessonModal lesson={lesson} courseId={courseId} moduleId={moduleId} />
        </>
    );
};

export default LessonModalPage;
