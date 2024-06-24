import { Accordion } from "@/components/ui/accordion";
import { BookCheck, Clock10 } from "lucide-react";
import CourseModuleList from "../../Module/CourseModuleList/CourseModuleList";
import { convertDuration } from "@/lib/date";

const Curriculum = ({ modules }) => {
    const totalDuration = modules?.reduce((acc, { lessonIds }) =>
        acc + (lessonIds?.reduce((a, { duration }) => a + duration, 0) || 0), 0);

    const formatDuration = convertDuration(totalDuration);

    return (
        <>
            <div className='flex flex-wrap items-center justify-center mt-4 mb-6 text-sm text-gray-600 dark:text-gray-400 gap-x-5'>
                <span className='flex items-center gap-1.5'>
                    <BookCheck className='w-4 h-4' />
                    {modules?.length} Chapters
                </span>
                <span className='flex items-center gap-1.5'>
                    <Clock10 className='w-4 h-4' />
                    {formatDuration?.duration ?? 0} {formatDuration?.unit ?? "minutes"}
                </span>
            </div>
            {/* contents */}
            <Accordion
                defaultValue={['item-1', 'item-2', 'item-3']}
                type='multiple'
                className='w-full'
            >
                {
                    modules?.map(module => <CourseModuleList key={module.id} module={module} />)
                }
            </Accordion>
            {/* contents end */}
        </>
    );
};

export default Curriculum;