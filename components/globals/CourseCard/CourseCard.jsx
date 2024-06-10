import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = ({ course }) => {
    const { id, title, thumbnail: { url }, price, category, modules } = course;

    return (
        <>

            <Link className="block" href={`/courses/${id}`}>
                <div className='h-full p-3 overflow-hidden transition border rounded-lg bg-background group hover:shadow-sm'>
                    <div className='relative w-full overflow-hidden rounded-md aspect-video'>
                        <Image
                            src={url}
                            alt={title}
                            className='object-cover'
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            fill
                        />
                    </div>
                    <div className='flex flex-col pt-2'>
                        <div className='text-lg font-medium md:text-base group-hover:text-sky-700 dark:group-hover:text-sky-500 line-clamp-2'>
                            {title}
                        </div>
                        <p className='text-xs text-muted-foreground'>{category?.title}</p>
                        <div className='flex items-center my-3 text-sm gap-x-2 md:text-xs'>
                            <div className='flex items-center gap-x-1 text-slate-500'>
                                <div>
                                    <BookOpen className='w-4' />
                                </div>
                                <span>{modules.length} Chapters</span>
                            </div>
                        </div>

                        {/* <CourseProgress
                        size='sm'
                        value={80}
                        variant={110 === 100 ? 'success' : ''}
                    /> */}

                        <div className='flex items-center justify-between mt-4'>
                            <p className='font-medium text-md md:text-sm text-slate-700 dark:text-slate-300'>
                                {formatPrice(price)}
                            </p>

                            <Button
                                variant='ghost'
                                className='gap-1 text-xs text-sky-700 dark:text-sky-500 h-7'
                            >
                                Enroll
                                <ArrowRight className='w-3' />
                            </Button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default CourseCard;