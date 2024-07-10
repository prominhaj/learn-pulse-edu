import { formatPrice } from "@/lib/formatPrice";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EnrollButton from "../EnrollButton/EnrollButton";
import { Card } from "@/components/ui/card";
import { getUserData } from "@/lib/getUserData";
import { hasEnrollmentForCourse, totalEnrollCourse } from "@/queries/enrollments";
import { getImage } from "@/lib/getImage";
import { getCourseProgress } from "@/lib/course";
import CourseAccessLink from "../CourseAccessLink/CourseAccessLink";
import { CourseProgress } from "../CourseProgress/CourseProgress";

const CourseCard = async ({ course }) => {
    const { id, title, thumbnail, price, category, modules } = course;
    const user = await getUserData();
    const isEnroll = await hasEnrollmentForCourse(id, user?.id);
    const courseProgress = await getCourseProgress(course?.id);
    const totalEnrollment = await totalEnrollCourse(course?.id);

    // Image Placeholder
    const { base64, img } = await getImage(thumbnail?.url) || {};

    return (
        <>
            <Card className='flex flex-col justify-between h-full p-3 overflow-hidden transition border rounded-lg bg-background group hover:shadow-sm'>
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
                            <div className='flex items-center mt-2 mb-1 text-sm gap-x-2 md:text-xs'>
                                <div className='flex items-center gap-x-1 text-muted-foreground'>
                                    <div>
                                        <BookOpen className='w-4' />
                                    </div>
                                    <span>{modules.length} Chapters</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="mb-2">
                    {isEnroll ? (
                        <CourseProgress
                            size='sm'
                            value={courseProgress}
                            variant={110 === 100 ? 'success' : ''}
                        />
                    ) : (
                        <p className='text-sm text-muted-foreground'>Total Enrollment: {totalEnrollment}</p>
                    )}
                </div>
                <div>
                    {
                        isEnroll ? (
                            <div>
                                <CourseAccessLink
                                    className="rounded-2xl"
                                    courseId={course?.id}
                                    variant="primary"
                                    size="sm"
                                />
                            </div>
                        ) : (
                            <div className='flex items-center justify-between'>
                                <h4 className='font-medium text-md md:text-sm text-slate-700 dark:text-slate-300'>
                                    {course?.price === 0 ? "Free" : formatPrice(price)}
                                </h4>
                                <EnrollButton price={course?.price} asLink={true} courseId={id} />
                            </div >
                        )
                    }
                </div>
            </Card >
        </>
    );
};

export default CourseCard;