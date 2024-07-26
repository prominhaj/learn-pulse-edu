import { SectionTitle } from '@/components/globals/SectionTitle/SectionTitle';
import { getTopsInstructors } from '@/queries/instructor';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import InstructorCard from './_components/InstructorCard/InstructorCard';

const InstructorSection = async () => {
    const instructors = await getTopsInstructors();

    return (
        <>
            <div className='container py-8 space-y-6 md:pt-8 md:pb-12 lg:pt-12'>
                <div className='flex items-center justify-between'>
                    <SectionTitle>Instructors</SectionTitle>
                    <Link
                        href='/courses'
                        className='flex items-center gap-1 text-sm font-medium hover:opacity-80'
                    >
                        Browse All <ArrowRightIcon className='w-4 h-4' />
                    </Link>
                </div>
                <div className='grid grid-cols-1 gap-5 py-4 md:grid-cols-2 lg:grid-cols-3'>
                    {instructors?.map((instructor) => (
                        <InstructorCard key={instructor.id} instructor={instructor} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default InstructorSection;
