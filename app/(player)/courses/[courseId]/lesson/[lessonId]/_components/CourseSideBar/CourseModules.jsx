import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import CourseModuleItem from "./CourseModuleItem";

const CourseModules = ({ modules, courseId, lessonId }) => {
    const moduleLessonOrder = modules.find(module => module?.lessonIds.find(lesson => lesson?._id.toString() === lessonId));

    return (
        <ScrollArea className="h-[18rem] md:h-[25rem]">
            <Accordion
                defaultValue={`module-${moduleLessonOrder?.order}`}
                type="single"
                collapsible
                className="w-full"
            >
                {
                    modules?.map((module) => (
                        <CourseModuleItem
                            key={module?._id.toString()}
                            module={module}
                            courseId={courseId}
                            lessonId={lessonId}
                        />
                    ))
                }
            </Accordion>
        </ScrollArea>
    );
};

export default CourseModules;