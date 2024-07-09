import { getCourseByCourseId } from '@/queries/courses';

export const nextAndPrevLesson = async (courseId, lesson) => {
    const course = await getCourseByCourseId(courseId);

    const allLessons = course?.modules?.reduce(
        (lessons, module) => lessons.concat(module.lessonIds),
        []
    );
    const currentLessonIndex = allLessons?.findIndex(
        (lessons) => lessons?._id?.toString() === lesson
    );

    const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
    const nextLesson =
        currentLessonIndex < allLessons?.length - 1 ? allLessons[currentLessonIndex + 1] : null;

    const prevLessonId = prevLesson?._id.toString() ?? null;
    const nextLessonId = nextLesson?._id.toString() ?? null;

    return { prevLessonId, nextLessonId };
};
