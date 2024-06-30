import { convertDuration } from "@/lib/date";
import { getUserData } from "@/lib/getUserData";
import { cn } from "@/lib/utils";
import { isLessonWatchCompleted } from "@/queries/watch-histories";
import { CircleCheck, CirclePlay, Lock } from "lucide-react";
import Link from "next/link";

const CourseLessonItem = async ({ lesson, courseId, lessonId }) => {
    const user = await getUserData();
    const isCompleted = await isLessonWatchCompleted({
        lesson_id: lesson._id,
        user_id: user?.id,
    })
    // converted data
    const isLessonAction = lessonId === lesson?._id.toString();
    const formatLessonDuration = convertDuration(lesson?.duration);
    const isActive = lesson?.active;

    return (
        <Link
            href={isActive ? `/courses/${courseId}/lesson/${lesson?._id.toString()}` : "#"}
            className={cn(
                isLessonAction && "bg-[#F3F4F6] dark:bg-[#1F2937]",
                !isActive && "opacity-70",
                "text-black dark:text-slate-300 text-sm font-[500] transition-all hover:bg-[#F3F4F6] dark:hover:bg-[#1F2937] dark:hover:text-white flex items-start w-full gap-3 px-3 sm:px-6 py-1.5"
            )}
        >
            {
                isActive ? (
                    <CirclePlay className="dark:text-[#0284C7] text-[#6D28D9]" />
                ) : (
                    <Lock className="dark:text-[#0284C7] text-[#6D28D9]" />
                )
            }

            <div className="flex flex-col items-start w-full gap-y-0.5">
                <div className="flex items-center w-full gap-x-2">
                    <div className="flex items-center justify-between w-full">
                        {lesson?.title}
                        {
                            isCompleted && <CircleCheck
                                size={16}
                                className={cn(
                                    "text-white w-5 h-5 bg-emerald-500 rounded-full"
                                )}
                            />
                        }
                    </div>
                </div>
                <span className="text-[0.70rem] font-normal">
                    {formatLessonDuration.duration} {formatLessonDuration.unit}
                </span>
            </div>
        </Link>
    );
};

export default CourseLessonItem;