import { getCourseByCourseId } from '@/queries/courses';
import { CourseSidebar } from '../_components/CourseSideBar/course-sidebar';

const CourseSideBar = async ({ params: { courseId, lesson_slug } }) => {
    const course = await getCourseByCourseId(courseId);
    return (
        <div>
            <CourseSidebar course={course} lessonSlug={lesson_slug} />
        </div>
    );
};

export default CourseSideBar;
