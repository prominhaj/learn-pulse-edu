import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/formatPrice';
import { ArrowRight } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import CourseFilterSection from './_components/CourseFilterSecton/CourseFilterSection';

// Metadata
export const metadata = {
    title: 'Courses - Learn Pulse Edu',
    description: 'Explore || Learn || Build || Share || Courses'
};

const courses = [
    {
        id: 1,
        title: 'Design',
        thumbnail: '/assets/images/categories/design.jpg'
    },

    {
        id: 3,
        title: 'Development',
        thumbnail: '/assets/images/categories/development.jpg'
    },
    {
        id: 4,
        title: 'Marketing',
        thumbnail: '/assets/images/categories/marketing.jpg'
    },
    {
        id: 5,
        title: 'IT & Software',
        thumbnail: '/assets/images/categories/it_software.jpg'
    },
    {
        id: 6,
        title: 'Personal Development',
        thumbnail: '/assets/images/categories/personal_development.jpg'
    },
    {
        id: 7,
        title: 'Business',
        thumbnail: '/assets/images/categories/business.jpg'
    },
    {
        id: 8,
        title: 'Photography',
        thumbnail: '/assets/images/categories/photography.jpg'
    },
    {
        id: 9,
        title: 'Music',
        thumbnail: '/assets/images/categories/music.jpg'
    }
];

const CoursesPage = () => {
    return (
        <section id='courses' className='container py-6 space-y-6 dark:bg-transparent'>
            <h2 className='text-xl font-medium md:text-2xl'>All Courses</h2>

            <CourseFilterSection>
                <div className='grid gap-4 lg:col-span-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
                    {courses.map((category) => {
                        return (
                            <Link key={category.id} href={`/courses/${category.id}`}>
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
                                        <p className='text-xs text-muted-foreground'>Development</p>
                                        <div className='flex items-center my-3 text-sm gap-x-2 md:text-xs'>
                                            <div className='flex items-center gap-x-1 text-slate-500'>
                                                <div>
                                                    <BookOpen className='w-4' />
                                                </div>
                                                <span>4 Chapters</span>
                                            </div>
                                        </div>

                                        {/* <CourseProgress
                                                size='sm'
                                                value={80}
                                                variant={110 === 100 ? 'success' : ''}
                                            /> */}

                                        <div className='flex items-center justify-between mt-4'>
                                            <p className='font-medium text-md md:text-sm text-slate-700'>
                                                {formatPrice(49)}
                                            </p>

                                            <Button
                                                variant='ghost'
                                                className='gap-1 text-xs text-sky-700 h-7'
                                            >
                                                Enroll
                                                <ArrowRight className='w-3' />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </CourseFilterSection>
        </section>
    );
};
export default CoursesPage;
