import { cn } from "@/lib/utils";
import { CheckCircle, CirclePlay } from "lucide-react";
import Link from "next/link";

const CourseLessonItem = () => {
    const isActive = true;
    const isCompleted = true;
    return (
        <Link
            href="#"
            className={cn(
                "text-black dark:text-slate-300 text-sm font-[500] transition-all hover:text-slate-600 hover:bg-[#F3F4F6] dark:hover:bg-[#1F2937] flex items-start w-full gap-3 px-3 sm:px-6 py-1.5"
            )}
        >
            <CirclePlay className="dark:text-[#0284C7] text-[#6D28D9]" />
            <div className="flex flex-col items-start w-full gap-y-0.5">
                <div className="flex items-center w-full gap-x-2">
                    <div className="flex items-center justify-between w-full">
                        Introduction
                        <CheckCircle
                            size={16}
                            className={cn(
                                "text-slate-500 dark:text-slate-300",
                                isActive && "text-slate-700 dark:text-slate-200",
                                isCompleted && "text-emerald-700 dark:text-emerald-300"
                            )}
                        />
                    </div>
                </div>
                <span className="text-[0.70rem] font-normal">
                    0.00 minutes
                </span>
            </div>
        </Link>
    );
};

export default CourseLessonItem;