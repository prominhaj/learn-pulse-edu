import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatMyDate } from "@/lib/date";
import Image from "next/image";
import Overview from "./Overview/Overview";
import Curriculum from "./Curriculum/Curriculum";
import { replaceMongoIdInArray } from "@/lib/convertData";
import InstructorDetails from "../InstructorDetails/InstructorDetails";

const CourseDetails = ({ course }) => {
    const { title, sub_title, category, instructor, description, learning, modules, updatedAt } = course;
    // OverView
    const overView = {
        description,
        learning,
    }

    return (
        <section className='py-8 md:py-12'>
            <div className='container'>
                <span className='dark:bg-secondary-foreground dark:text-black bg-primary px-4 py-0.5 rounded-full text-xs font-medium text-white inline-block'>
                    {category?.title}
                </span>
                <h3 className='mt-3 text-2xl font-bold md:text-3xl lg:text-4xl 2xl:text-5xl'>
                    {title}
                </h3>
                <p className='mt-3 text-sm text-gray-600 dark:text-gray-400'>{sub_title}</p>
                {/*  */}
                <div className='flex flex-col gap-5 mt-6 sm:items-center sm:flex-row sm:gap-6 md:gap-20'>
                    <div className='flex items-center gap-2'>
                        <Image
                            width={50}
                            height={50}
                            className='w-[40px] h-[40px] rounded-full'
                            src={instructor?.profile_picture?.url}
                            alt='sumit saha'
                        />
                        <p className='font-bold'>
                            {instructor?.firstName} {''} {instructor?.lastName}
                        </p>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <span className='font-semibold text-success'>Last Updated: </span>
                        <span>{formatMyDate(updatedAt)}</span>
                    </div>
                </div>

                {/* Tab */}
                <div className='my-6'>
                    <Tabs defaultValue='overview' className='w-full'>
                        <TabsList className='grid w-full grid-cols-3 my-6 max-w-[768px]'>
                            <TabsTrigger value='overview'>Overview</TabsTrigger>
                            <TabsTrigger value='curriculum'>Curriculum</TabsTrigger>
                            <TabsTrigger value='instructor'>Instructor</TabsTrigger>
                            {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
                        </TabsList>
                        <TabsContent value='overview'>
                            {/* each tab content can be independent component */}
                            <Overview overView={overView} />
                        </TabsContent>
                        <TabsContent value='curriculum'>
                            {/* each tab content can be independent component */}
                            <Curriculum modules={replaceMongoIdInArray(modules)} />
                        </TabsContent>
                        <TabsContent value='instructor'>
                            {/* each tab content can be independent component */}
                            <InstructorDetails />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </section>
    );
};

export default CourseDetails;