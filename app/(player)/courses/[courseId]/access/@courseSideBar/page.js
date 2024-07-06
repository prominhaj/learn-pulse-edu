import { getCourseByCourseId } from '@/queries/courses';
import { CourseSidebar } from '../_components/CourseSideBar/course-sidebar';

const CourseSideBar = async ({ params: { courseId }, searchParams: { lesson } }) => {
    const course = await getCourseByCourseId(courseId);
    return (
        <div>
            <CourseSidebar course={course} lessonId={lesson} />
        </div>
    );
};

export default CourseSideBar;
