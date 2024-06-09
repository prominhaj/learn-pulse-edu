import { getCourseDetailsByInstructor } from "@/queries/courses";
import { MessageSquare, Presentation, Star, UsersRound } from "lucide-react";
import Image from "next/image";

const InstructorDetails = async ({ instructor }) => {

    const fullName = `${instructor?.firstName}  ${instructor?.lastName}`;
    const { courses, enrollments, reviews, ratings } = await getCourseDetailsByInstructor(instructor._id.toString());

    return (
        <div className='p-3 border rounded-md sm:p-5 md:p-8 bg-background'>
            <div className='mb-8 md:flex md:gap-x-5'>
                <div className='h-[310px] w-full md:w-[270px] aspect-video max-w-full flex-none rounded mb-5 md:mb-0'>
                    <Image
                        width={300}
                        height={350}
                        src={instructor?.profile_picture?.url}
                        alt=''
                        className='object-cover w-full h-full rounded'
                    />
                </div>
                <div className='flex-1'>
                    <div className='max-w-[300px]'>
                        <h4 className='text-2xl text-gray-900 dark:text-gray-100 md:text-[34px] font-bold leading-8 sm:leading-10 md:leading-[51px]'>
                            {fullName}
                        </h4>
                        <div className='mb-6 font-medium text-gray-600 dark:text-gray-400'>
                            {instructor?.designation}
                        </div>
                        <ul className='space-y-4 list'>
                            <li className='flex items-center space-x-3'>
                                <Presentation className='text-gray-600 dark:text-gray-400' />
                                <div>{courses} Courses</div>
                            </li>
                            <li className='flex space-x-3'>
                                <UsersRound className='text-gray-600 dark:text-gray-400' />
                                <div>{enrollments} Student Learned</div>
                            </li>
                            <li className='flex space-x-3'>
                                <MessageSquare className='text-gray-600 dark:text-gray-400' />
                                <div>{reviews} Reviews</div>
                            </li>
                            <li className='flex space-x-3'>
                                <Star className='text-gray-600 dark:text-gray-400' />
                                <div>{ratings} Average Rating</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <p className='text-gray-600 dark:text-gray-400'>
                {instructor?.bio}
            </p>
        </div>
    );
};

export default InstructorDetails;