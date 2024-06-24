import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock10, Video } from "lucide-react";
import CourseLessonList from "../CourseLessonList/CourseLessonList";
import { convertDuration } from "@/lib/date";

const CourseModuleList = ({ module }) => {
    const moduleDuration = module?.lessonIds.reduce((acc, obj) => acc + obj.duration, 0);
    const formatDuration = convertDuration(moduleDuration);

    return (
        <AccordionItem className='border-none' value='item-1'>
            <AccordionTrigger>{module?.title}</AccordionTrigger>
            <AccordionContent>
                {/* header */}
                <div className='flex flex-wrap items-center mt-4 mb-6 text-sm text-gray-600 dark:text-gray-400 gap-x-5'>
                    <span className='flex items-center gap-1.5'>
                        <Video className='w-4 h-4' />
                        {module?.lessonIds.length} Lessons
                    </span>
                    <span className='flex items-center gap-1.5'>
                        <Clock10 className='w-4 h-4' />
                        {formatDuration?.duration} {formatDuration?.unit}
                    </span>
                </div>
                {/* header ends */}

                <div className='space-y-3'>
                    {/* item */}
                    {
                        module?.lessonIds && module?.lessonIds.map(lesson => (
                            <CourseLessonList key={lesson._id.toString()} lesson={lesson} />
                        ))
                    }
                    {/* item ends */}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};

export default CourseModuleList;