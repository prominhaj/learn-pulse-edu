import {
    Accordion,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import CourseModuleItem from "./CourseModuleItem";

const CourseModules = ({ modules, courseId, lessonSlug }) => {

    return (
        <ScrollArea className="h-[18rem] md:h-[25rem]">
            <Accordion
                defaultValue="module-0"
                type="single"
                collapsible
                className="w-full"
            >
                {
                    modules?.map((module, index) => (
                        <CourseModuleItem
                            key={module?._id.toString()}
                            module={module}
                            index={index}
                            courseId={courseId}
                            lessonSlug={lessonSlug}
                        />
                    ))
                }
            </Accordion>
        </ScrollArea>
    );
};

export default CourseModules;