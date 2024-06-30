import { getCourseByCourseId } from '@/queries/courses';
import { CourseSidebar } from '../_components/CourseSideBar/course-sidebar';

const CourseSideBar = async ({ params: { courseId, lessonId } }) => {
    const course = await getCourseByCourseId(courseId);
    return (
        <div>
            <CourseSidebar course={course} lessonId={lessonId} />
        </div>
    );
};

export default CourseSideBar;
