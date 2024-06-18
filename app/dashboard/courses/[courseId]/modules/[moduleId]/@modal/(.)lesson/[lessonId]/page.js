import { getLesson } from '@/queries/lesson';
import LessonModal from './_component/LessonModal';

const LessonModalPage = async ({ params: { lessonId, courseId } }) => {
    const lesson = await getLesson(lessonId);
    
    return (
        <>
            <LessonModal lesson={lesson} courseId={courseId} />
        </>
    );
};

export default LessonModalPage;
