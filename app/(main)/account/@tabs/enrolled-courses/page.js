// import { CourseProgress } from "@/components/course-progress";
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';

const EnrolledCourses = () => {
    return (
        <div className='grid gap-6 sm:grid-cols-2'>
            <div className='h-full p-3 overflow-hidden transition border rounded-lg group hover:shadow-sm'>
                <div className='relative w-full overflow-hidden rounded-md aspect-video'>
                    <Image
                        src='/assets/images/courses/course_1.png'
                        alt={'course'}
                        className='object-cover'
                        fill
                    />
                </div>
                <div className='flex flex-col pt-2'>
                    <div className='text-lg font-medium md:text-base group-hover:text-sky-700 line-clamp-2'>
                        Reactive Accelerator
                    </div>
                    <div className='text-xs text-muted-foreground'>Development</div>
                    <div className='flex items-center my-3 text-sm gap-x-2 md:text-xs'>
                        <div className='flex items-center gap-x-1 text-slate-500'>
                            <div>
                                <BookOpen className='w-4' />
                            </div>
                            <span>4 Chapters</span>
                        </div>
                    </div>
                    <div className='pb-2 mb-2 border-b '>
                        <div className='flex items-center justify-between'>
                            <div className='font-medium text-md md:text-sm text-slate-700'>
                                Total Modules: 10
                            </div>
                            <div className='font-medium text-md md:text-sm text-slate-700'>
                                Completed Modules <Badge variant='success'>05</Badge>
                            </div>
                        </div>
                        <div className='flex items-center justify-between mt-2'>
                            <div className='font-medium text-md md:text-sm text-slate-700'>
                                Total Quizzes: 10
                            </div>

                            <div className='font-medium text-md md:text-sm text-slate-700'>
                                Quiz taken <Badge variant='success'>10</Badge>
                            </div>
                        </div>
                        <div className='flex items-center justify-between mt-2'>
                            <div className='font-medium text-md md:text-sm text-slate-700'>
                                Mark from Quizzes
                            </div>

                            <div className='font-medium text-md md:text-sm text-slate-700'>50</div>
                        </div>
                        <div className='flex items-center justify-between mt-2'>
                            <div className='font-medium text-md md:text-sm text-slate-700'>
                                Others
                            </div>

                            <div className='font-medium text-md md:text-sm text-slate-700'>50</div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='font-medium text-md md:text-sm text-slate-700'>
                            Total Marks
                        </div>

                        <div className='font-medium text-md md:text-sm text-slate-700'>100</div>
                    </div>

                    {/* <CourseProgress
						size="sm"
						value={80}
						variant={110 === 100 ? "success" : ""}
					/> */}
                </div>
            </div>
        </div>
    );
};

export default EnrolledCourses;
