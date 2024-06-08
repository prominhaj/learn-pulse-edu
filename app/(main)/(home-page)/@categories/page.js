import { SectionTitle } from '@/components/globals/SectionTitle/SectionTitle';
import { getCategories } from '@/queries/categories';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import CategoryCard from './_components/CategoryCard/CategoryCard';

const CategorySection = async () => {
    const categories = await getCategories();
    return (
        <div>
            <section id='categories' className='container py-8 space-y-6 md:py-12 lg:py-24'>
                <div className='flex items-center justify-between'>
                    <SectionTitle>Categories</SectionTitle>

                    <Link
                        href={'/courses'}
                        className='flex items-center gap-1 text-sm font-medium hover:opacity-80'
                    >
                        Browse All <ArrowRightIcon className='w-4 h-4' />
                    </Link>
                </div>
                <div className='grid justify-center grid-cols-2 gap-4 mx-auto md:grid-cols-3 2xl:grid-cols-4'>
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CategorySection;
