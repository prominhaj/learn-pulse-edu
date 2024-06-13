import { formatPrice } from "@/lib/formatPrice";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EnrollButton from "../EnrollButton/EnrollButton";

const CourseCard = ({ course }) => {
    const { id, title, thumbnail: { url }, price, category, modules } = course;

    return (
        <>

            <div className='h-full p-3 overflow-hidden transition border rounded-lg bg-background group hover:shadow-sm'>
                <Link className="block" href={`/courses/${id}`}>
                    <div >
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
                        </div>
                    </div>
                </Link>
                <div className='flex items-center justify-between'>
                    <p className='font-medium text-md md:text-sm text-slate-700 dark:text-slate-300'>
                        {formatPrice(price)}
                    </p>

                    <EnrollButton asLink={true} courseId={id} />
                </div>
            </div>
        </>
    );
};

export default CourseCard;