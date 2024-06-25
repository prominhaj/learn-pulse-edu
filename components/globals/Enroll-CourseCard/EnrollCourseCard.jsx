import { getCategoryDetails } from '@/queries/categories';
import { getAReport } from '@/queries/reports';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import { CourseProgress } from '../CourseProgress/CourseProgress';
import { getCourseProgress } from '@/lib/course';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const EnrollCourseCard = async ({ enrollCourse }) => {
    const category = await getCategoryDetails(enrollCourse?.course_id?.category.toString());

    // Course Details
    const course = enrollCourse?.course_id;
    const courseTitle = course?.title;
    const courseImg = course?.thumbnail?.url;
    const modules = course?.modules;

    // Total Course Progress
    const courseProgress = await getCourseProgress(course?._id);

    // Filter by Reports
    const filter = {
        user_id: enrollCourse?.user_id,
        course_id: course
    }

    const report = await getAReport(filter);

    // Total Completed Modules
    const totalModuleCompleted = report?.total_completed_modules;

    // Get all Quizzes and Assignments
    const quizzes = report?.quizAssessment?.assessments;
    const totalQuizzes = quizzes?.length;

    // Find attempted quizzes
    const quizzesTaken = quizzes?.filter(q => q.attempted);

    // Find how many quizzes answered correct

    const totalCorrect = quizzesTaken?.map(quiz => {
        const item = quiz.options
        return item.filter(o => {
            return o.isCorrect === true && o.isSelected === true
        })
    }).filter(elem => elem.length > 0).flat();

    const marksFromQuizzes = totalCorrect?.length * 5 || 0;

    const otherMarks = report?.quizAssessment?.otherMarks;

    const totalMarks = (marksFromQuizzes + otherMarks) || 0;

    return (
        <div className='h-full p-3 overflow-hidden transition duration-300 border rounded-lg bg-background group hover:shadow-sm'>
            <div className='relative w-full overflow-hidden rounded-md aspect-video'>
                <Image
                    src={courseImg}
                    alt={courseTitle}
                    className='object-cover'
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    priority
                />
            </div>
            <div className='flex flex-col pt-2'>
                <div className='text-lg font-medium transition duration-200 md:text-base group-hover:text-sky-700 dark:group-hover:text-sky-500 line-clamp-2'>
                    {courseTitle}
                </div>
                <div className='text-xs text-muted-foreground'>{category?.title}</div>
                <div className='flex items-center my-3 text-sm gap-x-2 md:text-xs'>
                    <div className='flex items-center gap-x-1 text-muted-foreground'>
                        <div>
                            <BookOpen className='w-4' />
                        </div>
                        <span>{modules.length} Chapters</span>
                    </div>
                </div>
                <div className='pb-2 mb-2 border-b'>
                    <div className='flex items-center justify-between'>
                        <div className='font-medium text-md md:text-sm text-slate-700 dark:text-slate-300'>
                            Total Modules: {modules?.length}
                        </div>
                        <div className='font-medium text-md md:text-sm text-slate-700 dark:text-slate-300'>
                            Completed Modules {totalModuleCompleted || 0}
                        </div>
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                        <div className='font-medium text-md md:text-sm text-slate-700 dark:text-slate-300'>
                            Total Quizzes: {totalQuizzes}
                        </div>

                        <div className='font-medium text-md md:text-sm text-slate-700 dark:text-slate-300'>
                            Quiz taken {quizzesTaken?.length || 0}
                        </div>
                    </div>

                    <div className='flex items-center justify-between pt-1.5 mt-2 border-t'>
                        <div className='font-medium text-md md:text-sm text-slate-700 dark:text-slate-300'>
                            Mark from Quizzes
                        </div>

                        <div className='font-medium text-md md:text-sm text-slate-700 dark:text-slate-300'>
                            {marksFromQuizzes}
                        </div>
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                        <div className='font-medium text-md md:text-sm text-slate-700 dark:text-slate-300'>
                            Others
                        </div>

                        <div className='font-medium text-md md:text-sm text-slate-700 dark:text-slate-300'>
                            {otherMarks || 0}
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between mb-4'>
                    <div className='font-medium text-md md:text-sm text-slate-700 dark:text-slate-300'>
                        Total Marks
                    </div>

                    <div className='font-medium text-md md:text-sm text-slate-700 dark:text-slate-300'>
                        {totalMarks}
                    </div>
                </div>

                <CourseProgress
                    size="sm"
                    value={courseProgress}
                    variant={110 === 100 ? "success" : ""}
                />
                <Link href={`/course/${course?._id.toString()}/lesson`} className={cn(buttonVariants({ variant: "default" }), "mt-3")}>
                    Access Now
                </Link>
            </div>
        </div>
    );
};

export default EnrollCourseCard;