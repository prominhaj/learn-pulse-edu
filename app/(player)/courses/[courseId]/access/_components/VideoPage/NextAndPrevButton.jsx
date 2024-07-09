import { lessonNextAccess, lessonPrevAccess } from "@/app/actions";
import LessonBackButton from "./LessonBackButton";
import LessonNextButton from "./LessonNextButton";
import { nextAndPrevLesson } from "@/lib/lesson";

const NextAndPrevButton = async ({ lesson, courseId }) => {
    const { prevLessonId, nextLessonId } = await nextAndPrevLesson(courseId, lesson);

    // Handle Form Actions Back Lessons
    const formActionsBack = async () => {
        "use server";
        await lessonPrevAccess(courseId, lesson)
    }

    // Handle Form Actions Next Lessons
    const formActionsNext = async () => {
        "use server";
        await lessonNextAccess(courseId, lesson)
    }

    return (
        <div className="flex items-center gap-3">
            <form action={formActionsBack}>
                <LessonBackButton prevLessonId={prevLessonId} />
            </form>


            <form action={formActionsNext}>
                <LessonNextButton nextLessonId={nextLessonId} />
            </form>
        </div>
    );
};

export default NextAndPrevButton;