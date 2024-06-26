import { convertDuration } from "@/lib/date";
import { cn } from "@/lib/utils";
import { CheckCircle, CirclePlay, Lock } from "lucide-react";
import Link from "next/link";

const CourseLessonItem = ({ lesson, courseId, lessonSlug }) => {
    const isActive = lesson?.active;
    const lessonSlugFormat = lesson?.slug.replace(/0/g, "-");
    const isLessonAction = lessonSlug === lessonSlugFormat;
    const formatLessonDuration = convertDuration(lesson?.duration)
    const isCompleted = false;

    return (
        <Link
            href={isActive ? `/courses/${courseId}/lesson/${lessonSlugFormat}` : "#"}
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
                            isCompleted && <CheckCircle
                                size={16}
                                className={cn(
                                    "text-slate-500 dark:text-slate-300",
                                    isActive && "text-slate-700 dark:text-slate-200",
                                    isCompleted && "text-emerald-700 dark:text-emerald-300"
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