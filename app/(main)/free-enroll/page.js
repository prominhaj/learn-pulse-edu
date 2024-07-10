import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { getCourseDetails } from '@/queries/courses';
import FreeEnroll from './_components/FreeEnroll';
import { getUserData } from '@/lib/getUserData';
import { hasEnrollmentForCourse } from '@/queries/enrollments';
import { CircleCheck } from 'lucide-react';
import CourseAccessLink from '@/components/globals/CourseAccessLink/CourseAccessLink';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { notFound, redirect } from 'next/navigation';

const FreeEnrollPage = async ({ searchParams: { courseId } }) => {
    // Check Search params Course id
    if (!courseId) {
        notFound();
    }

    const { course } = await getCourseDetails(courseId);
    const user = await getUserData();

    if (!user) {
        redirect(`/login?redirectUrl=/free-enroll?courseId=${courseId}`);
    }

    const isEnroll = await hasEnrollmentForCourse(course?.id, user?.id);

    const customerName = user?.firstName + ' ' + user?.lastName;
    const productName = course?.title;

    return (
        <div className='container py-8 mx-auto md:py-16'>
            <Card
                className={cn(
                    `grid max-w-4xl gap-3 p-4 mx-auto md:gap-8 md:p-8`,
                    !isEnroll && 'md:grid-cols-2'
                )}
            >
                {isEnroll ? (
                    <>
                        <div className='flex flex-col items-center justify-center w-full gap-5'>
                            <CircleCheck className='w-32 h-32 p-0 text-white rounded-full bg-success' />
                            <h1 className='text-xl text-center md:text-2xl lg:text-3xl'>
                                Congratulations, <strong>{customerName}</strong>! Your Enrollment
                                was Successful for <strong>{productName}</strong>
                            </h1>
                            <div className='flex items-center gap-3'>
                                <Button asChild size='sm'>
                                    <Link href='/account/enrolled-courses'>Browse Courses</Link>
                                </Button>
                                <CourseAccessLink
                                    className='text-black dark:text-white'
                                    courseId={courseId}
                                    variant='outline'
                                    size='sm'
                                >
                                    Play Course
                                </CourseAccessLink>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='overflow-hidden rounded-lg bg-card'>
                            <Image
                                src={course?.thumbnail?.url}
                                alt={course?.title}
                                width={600}
                                height={400}
                                className='object-cover w-full h-64'
                            />
                            <div className='pt-2 md:p-6'>
                                <h2 className='text-2xl font-bold'>Wireless Headphones</h2>
                                <p className='text-lg font-medium text-primary'>Free</p>
                            </div>
                        </div>
                        <div className='overflow-hidden rounded-lg shadow-lg bg-card'>
                            <div className='space-y-4 md:p-6'>
                                <div className='flex flex-col gap-1.5'>
                                    <div className='flex items-center gap-3'>
                                        <Label>Total Module:</Label>
                                        <p>{course?.modules?.length}</p>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <Label>Category:</Label>
                                        <span className='dark:bg-blue-500 dark:text-white bg-primary px-4 py-0.5 rounded-full text-xs font-medium text-white inline-block'>
                                            {course?.category?.title}
                                        </span>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <Label>Instructor Name:</Label>
                                        <p>
                                            {course?.instructor?.firstName +
                                                ' ' +
                                                course?.instructor?.lastName}
                                        </p>
                                    </div>
                                </div>
                                <FreeEnroll courseId={courseId} user={user} />
                            </div>
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
};

export default FreeEnrollPage;
