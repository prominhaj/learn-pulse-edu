import {
    Accordion,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import CourseModuleItem from "./CourseModuleItem";

const CourseModules = () => {

    return (
        <ScrollArea className="h-[18rem] md:h-[25rem]">
            <Accordion
                defaultValue="item-1"
                type="single"
                collapsible
                className="w-full"
            >
                {/* item */}
                <CourseModuleItem />
                {/* item ends */}
            </Accordion>
        </ScrollArea>
    );
};

export default CourseModules;