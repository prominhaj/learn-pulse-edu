import { SectionTitle } from "@/components/globals/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { formatPrice } from "@/lib/formatPrice";
import { ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

const RelatedCourse = () => {
    return (
        <section className='pb-8 sm:pb-10 md:pb-16'>
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
    );
};

export default RelatedCourse;