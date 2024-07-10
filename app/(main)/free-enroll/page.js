import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { getCourseDetails } from '@/queries/courses';

const FreeEnrollPage = async ({ searchParams: { courseId } }) => {
    const { course } = await getCourseDetails(courseId);
    console.log(course);
    return (
        <div className='container py-8 mx-auto md:py-16'>
            <Card className='grid max-w-4xl gap-3 p-4 mx-auto md:gap-8 md:grid-cols-2 md:p-8'>
                <div className='overflow-hidden rounded-lg shadow-lg bg-card'>
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
                        <Button variant='primary' className='w-full'>
                            Pay Now
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default FreeEnrollPage;
