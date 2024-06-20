import { getLesson } from '@/queries/lesson';
import LessonModalContent from '../../_components/lesson-modal-content';

const LessonEditPage = async ({ params: { lessonId, courseId } }) => {
    const lesson = await getLesson(lessonId);

    return (
        <div className='sm:max-w-[1200px] w-[96%] max-h-[90vh] mx-auto my-5 px-5 md:my-8'>
            <LessonModalContent lesson={lesson} courseId={courseId} />
        </div>
    );
};

export default LessonEditPage;
