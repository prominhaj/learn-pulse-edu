import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCheck } from 'lucide-react';
import { Presentation } from 'lucide-react';
import { UsersRound } from 'lucide-react';
import { Star } from 'lucide-react';
import { MessageSquare } from 'lucide-react';
import { BookCheck } from 'lucide-react';
import { Clock10 } from 'lucide-react';
import { Radio } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Video } from 'lucide-react';
import { NotepadText } from 'lucide-react';
import { FileQuestion } from 'lucide-react';
import { Tv } from 'lucide-react';
import { StickyNote } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/formatPrice';
import { SectionTitle } from '@/components/globals/SectionTitle/SectionTitle';
import { getCourseDetails } from '@/queries/courses';

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

const SingleCoursePage = async ({ params: { courseId } }) => {
    const course = await getCourseDetails(courseId);
    const {
        id,
        title,
        sub_title,
        description,
        thumbnail: { url },
        modules,
        price,
        active,
        category,
        instructor,
        testimonials,
        quizSet
    } = course || {};

    return (
        <>
            <div className='overflow-x-hidden'>
                <section className='py-12 sm:py-16'>
                    <div className='container'>
                        <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                            <div className='max-w-2xl mx-auto text-center'>
                                <h1 className='px-6 text-lg text-gray-600 dark:text-gray-400 font-inter'>
                                    {sub_title}
                                </h1>
                                <p className='mt-5 text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-poppins'>
                                    <span className='relative inline-flex sm:inline'>
                                        {/* <span className='bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0'></span> */}
                                        <span className='relative'>{title}</span>
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Back Ground Gray din */}
                        <>
                            <div
                                aria-hidden='true'
                                className='absolute inset-x-0 overflow-hidden pointer-events-none -top-16 -z-10 transform-gpu blur-3xl sm:-top-40'
                            >
                                <div
                                    style={{
                                        clipPath:
                                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                                    }}
                                    className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:bg-gray-800'
                                />
                            </div>
                        </>

                        <div className='mt-6'>
                            <div className='relative'>
                                <div className='absolute inset-0 h-2/3'></div>
                                <div className='relative mx-auto'>
                                    <div className='lg:max-w-3xl lg:mx-auto'>
                                        <Image
                                            className='w-full h-full rounded-lg'
                                            width={800}
                                            height={500}
                                            src={url}
                                            alt={title}
                                            quality={100}
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap items-center justify-center gap-3 mt-6'>
                            <Link href='' className={cn(buttonVariants({ size: 'lg' }))}>
                                Enroll Now
                            </Link>
                            <Link
                                href=''
                                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
                            >
                                See Intro
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            <section className='py-8 md:py-12 lg:py-24'>
                <div className='container'>
                    <span className='bg-success px-4 py-0.5 rounded-full text-xs font-medium text-white inline-block'>
                        Development
                    </span>
                    <h3 className='mt-3 text-2xl font-bold md:text-3xl lg:text-4xl 2xl:text-5xl'>
                        Reactive Accelerator
                    </h3>
                    <p className='mt-3 text-sm text-gray-600'>Master React JS & Next JS</p>
                    {/*  */}
                    <div className='flex flex-col gap-5 mt-6 sm:items-center sm:flex-row sm:gap-6 md:gap-20'>
                        <div className='flex items-center gap-2'>
                            <Image
                                width={50}
                                height={50}
                                className='w-[40px] h-[40px] rounded-full'
                                src='https://avatars.githubusercontent.com/u/3633137?v=4'
                                alt='sumit saha'
                            />
                            <p className='font-bold'>Tapas Adhikary</p>
                        </div>
                        <div className='flex items-center gap-2 text-sm'>
                            <span className='font-semibold text-success'>Last Updated: </span>
                            <span>Feb 22, 2022</span>
                        </div>
                    </div>

                    {/* Tab */}
                    <div className='my-6'>
                        <Tabs defaultValue='overview' className='w-full'>
                            <TabsList className='grid w-full grid-cols-3 my-6 max-w-[768px]'>
                                <TabsTrigger value='overview'>Overview</TabsTrigger>
                                <TabsTrigger value='curriculum'>Carriculum</TabsTrigger>
                                <TabsTrigger value='instructor'>Instructor</TabsTrigger>
                                {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
                            </TabsList>
                            <TabsContent value='overview'>
                                {/* each tab content can be independent component */}
                                <>
                                    <h3 className='text-2xl '>Course Description</h3>
                                    <p className='mt-4'>
                                        This tutorial will help you learn quickly and thoroughly.
                                        Lorem ipsum, or lipsum as it sometimes known, is dummy text
                                        used in laying out print, graphic or web designs. Lorem
                                        ipsum dolor sit amet, consectetuer adipiscing elit. Donec
                                        odio. Quisque volutpat mattis eros.
                                        <br /> <br /> You’ll be exposed to principles and
                                        strategies, but, more importantly, you’ll learn how actually
                                        apply these abstract concepts by coding three different
                                        websites for three very different the audiences. Lorem ipsum
                                        is dummy text used in laying out print, graphic or web
                                        designs Lorem ipsum blinding shot chinwag knees.
                                    </p>
                                    <div className='p-8 mt-8 space-y-6 rounded-md bg-gray-50'>
                                        <h4 className='text-2xl'>What You will Learn?</h4>
                                        <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                                            <li className='flex space-x-3'>
                                                <div className='relative flex-none top-1'>
                                                    <CheckCheck />
                                                </div>
                                                <div className='flex-1'>
                                                    Learn how perspective works and how to
                                                    incorporate your art
                                                </div>
                                            </li>
                                            <li className='flex space-x-3'>
                                                <div className='relative flex-none top-1'>
                                                    <CheckCheck />
                                                </div>
                                                <div className='flex-1'>
                                                    Learn how perspective works and how to
                                                    incorporate your art
                                                </div>
                                            </li>
                                            <li className='flex space-x-3'>
                                                <div className='relative flex-none top-1'>
                                                    <CheckCheck />
                                                </div>
                                                <div className='flex-1'>
                                                    Learn how perspective works and how to
                                                    incorporate your art
                                                </div>
                                            </li>
                                            <li className='flex space-x-3'>
                                                <div className='relative flex-none top-1'>
                                                    <CheckCheck />
                                                </div>
                                                <div className='flex-1'>
                                                    Learn how perspective works and how to
                                                    incorporate your art
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            </TabsContent>
                            <TabsContent value='curriculum'>
                                {/* each tab content can be independent component */}
                                <div className='flex flex-wrap items-center justify-center mt-4 mb-6 text-sm text-gray-600 gap-x-5'>
                                    <span className='flex items-center gap-1.5'>
                                        <BookCheck className='w-4 h-4' />
                                        12 Chapters
                                    </span>
                                    <span className='flex items-center gap-1.5'>
                                        <Clock10 className='w-4 h-4' />
                                        50+ Hours
                                    </span>
                                    <span className='flex items-center gap-1.5'>
                                        <Radio className='w-4 h-4' />4 Live Class
                                    </span>
                                </div>

                                {/* contents */}
                                <Accordion
                                    defaultValue={['item-1', 'item-2', 'item-3']}
                                    type='multiple'
                                    collapsible
                                    className='w-full'
                                >
                                    <AccordionItem className='border-none' value='item-1'>
                                        <AccordionTrigger>Introduction</AccordionTrigger>
                                        <AccordionContent>
                                            {/* header */}
                                            <div className='flex flex-wrap items-center mt-4 mb-6 text-sm text-gray-600 gap-x-5'>
                                                <span className='flex items-center gap-1.5'>
                                                    <Video className='w-4 h-4' />
                                                    12 Lessons
                                                </span>
                                                <span className='flex items-center gap-1.5'>
                                                    <NotepadText className='w-4 h-4' />
                                                    10 Notes
                                                </span>
                                                <span className='flex items-center gap-1.5'>
                                                    <FileQuestion className='w-4 h-4' />
                                                    10 Quiz
                                                </span>
                                                <span className='flex items-center gap-1.5'>
                                                    <Radio className='w-4 h-4' />1 Live Class
                                                </span>
                                            </div>
                                            {/* header ends */}

                                            <div className='space-y-3'>
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <Tv
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        What is React ?
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <Tv
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        Learn React Basics
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <Tv
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        Build A Simple React App
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <StickyNote
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        React Basic Note
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <StickyNote
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        Project Requirement Analysis
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem className='border-none' value='item-2'>
                                        <AccordionTrigger>Master Next JS</AccordionTrigger>
                                        <AccordionContent>
                                            {/* header */}
                                            <div className='flex flex-wrap items-center mt-4 mb-6 text-sm text-gray-600 gap-x-5'>
                                                <span className='flex items-center gap-1.5'>
                                                    <Video className='w-4 h-4' />
                                                    12 Lessons
                                                </span>
                                                <span className='flex items-center gap-1.5'>
                                                    <NotepadText className='w-4 h-4' />
                                                    10 Notes
                                                </span>
                                                <span className='flex items-center gap-1.5'>
                                                    <FileQuestion className='w-4 h-4' />
                                                    10 Quiz
                                                </span>
                                                <span className='flex items-center gap-1.5'>
                                                    <Radio className='w-4 h-4' />1 Live Class
                                                </span>
                                            </div>
                                            {/* header ends */}

                                            <div className='space-y-3'>
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <Tv
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        What is React ?
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <Tv
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        Learn React Basics
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <Tv
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        Build A Simple React App
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <StickyNote
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        React Basic Note
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <StickyNote
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        Project Requirement Analysis
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem className='border-none' value='item-3'>
                                        <AccordionTrigger>
                                            Built Ecommerce Using Next.js
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {/* header */}
                                            <div className='flex flex-wrap items-center mt-4 mb-6 text-sm text-gray-600 gap-x-5'>
                                                <span className='flex items-center gap-1.5'>
                                                    <Video className='w-4 h-4' />
                                                    12 Lessons
                                                </span>
                                                <span className='flex items-center gap-1.5'>
                                                    <NotepadText className='w-4 h-4' />
                                                    10 Notes
                                                </span>
                                                <span className='flex items-center gap-1.5'>
                                                    <FileQuestion className='w-4 h-4' />
                                                    10 Quiz
                                                </span>
                                                <span className='flex items-center gap-1.5'>
                                                    <Radio className='w-4 h-4' />1 Live Class
                                                </span>
                                            </div>
                                            {/* header ends */}

                                            <div className='space-y-3'>
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <Tv
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        What is React ?
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <Tv
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        Learn React Basics
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <Tv
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        Build A Simple React App
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <StickyNote
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        React Basic Note
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                                {/* item */}
                                                <button
                                                    type='button'
                                                    className={cn(
                                                        'flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full'
                                                    )}
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <StickyNote
                                                            size={16}
                                                            className={cn('text-slate-500')}
                                                        />
                                                        Project Requirement Analysis
                                                    </div>
                                                </button>
                                                {/* item ends */}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                {/* contents end */}
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

            {/* Testimonials */}
            <section className='pb-8 md:pb-12 lg:pb-24'>
                <div className='container'>
                    <SectionTitle className='mb-6'>Testimonials</SectionTitle>
                    <Carousel
                        opts={{
                            align: 'start'
                        }}
                        className='max-2xl:w-[90%] w-full mx-auto'
                    >
                        <CarouselPrevious />
                        <CarouselNext />
                        <CarouselContent className='py-4'>
                            {courses.map((course) => (
                                <CarouselItem key={course.id} className='md:basis-1/2 lg:basis-1/3'>
                                    <div className='sm:break-inside-avoid'>
                                        <blockquote className='p-6 rounded-lg shadow-sm bg-gray-50 sm:p-8'>
                                            <div className='flex items-center gap-4'>
                                                <Image
                                                    alt=''
                                                    src='https://i.pravatar.cc/56'
                                                    width={56}
                                                    height={56}
                                                    className='object-cover rounded-full size-14'
                                                />
                                                <div>
                                                    <p className='mt-0.5 text-lg font-medium text-gray-900'>
                                                        John Doe
                                                    </p>
                                                    <div className='flex justify-center gap-0.5 text-yellow-600'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='w-5 h-5'
                                                            viewBox='0 0 20 20'
                                                            fill='currentColor'
                                                        >
                                                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                                        </svg>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='w-5 h-5'
                                                            viewBox='0 0 20 20'
                                                            fill='currentColor'
                                                        >
                                                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                                        </svg>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='w-5 h-5'
                                                            viewBox='0 0 20 20'
                                                            fill='currentColor'
                                                        >
                                                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                                        </svg>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='w-5 h-5'
                                                            viewBox='0 0 20 20'
                                                            fill='currentColor'
                                                        >
                                                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                                        </svg>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='w-5 h-5'
                                                            viewBox='0 0 20 20'
                                                            fill='currentColor'
                                                        >
                                                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className='mt-4 text-gray-700'>
                                                Lorem ipsum dolor sit, amet consectetur adipisicing
                                                elit. Culpa sit rerum incidunt, a consequuntur
                                                recusandae ab saepe illo est quia obcaecati neque
                                                quibusdam eius accusamus error officiis atque
                                                voluptates magnam!
                                            </p>
                                        </blockquote>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </section>
            {/* Releated Course */}
            <section className=''>
                <div className='container'>
                    <SectionTitle className='mb-6'>Related Courses</SectionTitle>
                    <Carousel
                        opts={{
                            align: 'start'
                        }}
                        className='max-2xl:w-[90%] w-full mx-auto'
                    >
                        <CarouselPrevious />
                        <CarouselNext />
                        <CarouselContent>
                            {courses.map((course) => (
                                <CarouselItem key={course.id} className='md:basis-1/2 lg:basis-1/3'>
                                    <Link href={`/courses/${course.id}`}>
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
                                                <p className='text-xs text-muted-foreground'>
                                                    Development
                                                </p>
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
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </section>
            {/* Authors */}
            {/* https://avatars.githubusercontent.com/u/1416832?v=4 */}
            {/* https://avatars.githubusercontent.com/u/3633137?v=4 */}
        </>
    );
};
export default SingleCoursePage;
