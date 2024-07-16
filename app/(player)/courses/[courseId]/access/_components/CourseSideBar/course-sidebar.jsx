import { CourseProgress } from "@/components/globals/CourseProgress/CourseProgress";
import CourseModules from "./CourseModules";
import CourseActions from "./course-actions";
import { getCourseProgress } from "@/lib/course";
import { getUserData } from "@/lib/getUserData";

export const CourseSidebar = async ({ course, lessonId, courseId }) => {
  const courseProgress = await getCourseProgress(course?.id);
  const modules = course?.modules?.sort((a, b) => a.order - b.order);
  const user = await getUserData();

  return (
    <>
      <div className="flex flex-col border shadow-sm">
        <div className="flex flex-col p-3 border-b sm:p-6">
          <h1 className="text-base font-semibold">{course?.title}</h1>
          {/* Check purchase */}
          {
            <div className="mt-3">
              <CourseProgress variant="success" value={courseProgress} />
            </div>
          }
        </div>

        <CourseModules modules={modules} courseId={course?.id} lessonId={lessonId} />

        <div className="px-3 py-3 space-y-3 sm:px-6">
          <CourseActions courseId={courseId} courseProgress={courseProgress} userId={user?.id} />
        </div>
      </div>

    </>
  );
};
