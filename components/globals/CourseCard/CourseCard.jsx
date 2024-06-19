import { formatPrice } from "@/lib/formatPrice";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EnrollButton from "../EnrollButton/EnrollButton";
import { Card } from "@/components/ui/card";
import { getUserData } from "@/lib/getUserData";
import { hasEnrollmentForCourse } from "@/queries/enrollments";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { getImage } from "@/lib/getImage";

const CourseCard = async ({ course }) => {
    const { id, title, thumbnail: { url }, price, category, modules } = course;
    const user = await getUserData();
    const isEnroll = await hasEnrollmentForCourse(id, user?.id);

    // Image Placeholder
    const { base64, img } = await getImage(url);

    return (
        <>
            <Card className='h-full p-3 overflow-hidden transition border rounded-lg bg-background group hover:shadow-sm'>
                <Link className="block" href={`/courses/${id}`}>
                    <div>
                        <div className='relative w-full overflow-hidden rounded-md aspect-video'>
                            <Image
                                {...img}
                                alt={title}
                                className="object-cover"
                                placeholder='blur'
                                blurDataURL={base64}
                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            />
                        </div>
                        <div className='flex flex-col pt-2'>
                            <div className='text-lg font-medium md:text-base group-hover:text-sky-700 dark:group-hover:text-sky-500 line-clamp-2'>
                                {title}
                            </div>
                            <p className='text-xs text-muted-foreground'>{category?.title}</p>
                            <div className='flex items-center my-3 text-sm gap-x-2 md:text-xs'>
                                <div className='flex items-center gap-x-1 text-muted-foreground'>
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
                    <h4 className='font-medium text-md md:text-sm text-slate-700 dark:text-slate-300'>
                        {formatPrice(price)}
                    </h4>

                    {isEnroll ? (
                        <Link href="" className={cn(buttonVariants({ size: "sm", variant: "secondary" }))}>
                            Access Course
                        </Link>
                    ) : (
                        <EnrollButton asLink={true} courseId={id} />
                    )}
                </div>
            </Card>
        </>
    );
};

export default CourseCard;