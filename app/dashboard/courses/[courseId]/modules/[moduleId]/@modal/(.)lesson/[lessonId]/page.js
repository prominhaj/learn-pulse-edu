import { getLesson } from '@/queries/lesson';
import LessonModal from './_component/LessonModal';
import { getCourseByCourseId } from '@/queries/courses';
import { getSlug } from '@/lib/convertData';

const LessonModalPage = async ({ params: { lessonId, moduleId, courseId } }) => {
    const lesson = await getLesson(lessonId);
    const course = await getCourseByCourseId(courseId);
    const slug = getSlug(course?.title);

    return (
        <>
            <LessonModal slug={slug} lesson={lesson} courseId={courseId} moduleId={moduleId} />
        </>
    );
};

export default LessonModalPage;
