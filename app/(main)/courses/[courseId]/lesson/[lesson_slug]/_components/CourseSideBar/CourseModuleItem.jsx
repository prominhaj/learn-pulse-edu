import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CourseLessonItem from "./CourseLessonItem";

const CourseModuleItem = () => {

    return (
        <AccordionItem className="border-0" value="item-1">
            <AccordionTrigger className="px-3 text-black dark:text-[#94A3B8] dark:data-[state=open]:bg-[#0284C7] data-[state=open]:bg-[#6D28D9] dark:data-[state=open]:text-white data-[state=open]:text-white hover:bg-[#6D28D9] hover:text-white dark:hover:bg-[#0284C7] dark:hover:text-white dark:hover:[&[data-state=open]>svg]:text-white sm:px-6">
                <span className="flex flex-col items-start">
                    <span className="block text-base font-semibold">
                        Module 0 - Introduction
                    </span>
                    <span className="text-[0.75rem] font-normal">
                        0.00 minutes
                    </span>
                </span>
            </AccordionTrigger>
            <AccordionContent className="mt-2">
                <div className="flex flex-col w-full gap-1.5">
                    <CourseLessonItem />
                    <CourseLessonItem />
                    <CourseLessonItem />
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};

export default CourseModuleItem;