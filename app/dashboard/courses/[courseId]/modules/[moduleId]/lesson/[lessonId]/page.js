import { getLesson } from '@/queries/lesson';
import LessonModalContent from '../../_components/lesson-modal-content';
import { getCourseByCourseId } from '@/queries/courses';
import { getSlug } from '@/lib/convertData';

const LessonEditPage = async ({ params: { lessonId, courseId, moduleId } }) => {
    const lesson = await getLesson(lessonId);
    const course = await getCourseByCourseId(courseId);
    const slug = getSlug(course?.title);

    return (
        <div className='sm:max-w-[1200px] w-[96%] max-h-[90vh] mx-auto my-5 px-5 md:my-8'>
            <LessonModalContent
                slug={slug}
                lesson={lesson}
                courseId={courseId}
                moduleId={moduleId}
            />
        </div>
    );
};

export default LessonEditPage;
