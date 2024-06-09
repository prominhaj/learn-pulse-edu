import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatMyDate } from "@/lib/date";
import { MessageSquare, Presentation, Star, UsersRound } from "lucide-react";
import Image from "next/image";
import Overview from "./Overview/Overview";
import Curriculum from "./Curriculum/Curriculum";
import { replaceMongoIdInArray } from "@/lib/convertData";

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
                            <div className='p-8 rounded-md bg-gray-50'>
                                <div className='mb-8 md:flex md:gap-x-5'>
                                    <div className='h-[310px] w-[270px] max-w-full  flex-none rounded mb-5 md:mb-0'>
                                        <Image
                                            width={300}
                                            height={350}
                                            src='https://avatars.githubusercontent.com/u/3633137?v=4'
                                            alt=''
                                            className='object-cover w-full h-full rounded'
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <div className='max-w-[300px]'>
                                            <h4 className='text-[34px] font-bold leading-[51px]'>
                                                Tapas Adhikary
                                            </h4>
                                            <div className='mb-6 font-medium text-gray-600'>
                                                Senior Software Engineer
                                            </div>
                                            <ul className='space-y-4 list'>
                                                <li className='flex items-center space-x-3'>
                                                    <Presentation className='text-gray-600' />
                                                    <div>10+ Courses</div>
                                                </li>
                                                <li className='flex space-x-3'>
                                                    <UsersRound className='text-gray-600' />
                                                    <div>2k+ Student Learned</div>
                                                </li>
                                                <li className='flex space-x-3'>
                                                    <MessageSquare className='text-gray-600' />
                                                    <div>1500+ Reviews</div>
                                                </li>
                                                <li className='flex space-x-3'>
                                                    <Star className='text-gray-600' />
                                                    <div>4.9 Average Rating</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p className='text-gray-600'>
                                    There are many variations of passages of Lorem Ipsum
                                    available, but the majority have suffered alteration in some
                                    form, by injected humour, or randomised words which do not
                                    look even slightly believable. If you are going to use a
                                    passage of Lorem Ipsum, you need to be sure there is not
                                    anything embarrassing hidden in the middle of text. All the
                                    Lorem Ipsum generators on the Internet tend.
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </section>
    );
};

export default CourseDetails;