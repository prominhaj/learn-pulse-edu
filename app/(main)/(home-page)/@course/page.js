import CourseCard from '@/components/globals/CourseCard/CourseCard';
import { SectionTitle } from '@/components/globals/SectionTitle/SectionTitle';
import { getCourses } from '@/queries/courses';
import { ArrowRightIcon } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';

const CoursesSection = async () => {
    cookies();
    const courses = await getCourses(true);

    return (
        <section className='container py-8 space-y-6 md:pt-8 md:pb-12 lg:pt-12'>
            <div className='flex items-center justify-between'>
                <SectionTitle>Courses</SectionTitle>
                <Link
                    href='/courses'
                    className='flex items-center gap-1 text-sm font-medium hover:opacity-80'
                >
                    Browse All <ArrowRightIcon className='w-4 h-4' />
                </Link>
            </div>
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4'>
                {courses?.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </section>
    );
};

export default CoursesSection;
