import { Skeleton } from '@/components/ui/skeleton';
import CategoryCardLoading from './_components/CategoryCardLoading/CategoryCardLoading';

const CategorySectionLoading = () => {
    return (
        <div className='container py-8 space-y-6 md:py-12 lg:py-24'>
            <div className='flex items-center justify-between animate-pulse'>
                <Skeleton className='w-1/5 h-6 rounded' />
                <div className='flex items-center justify-end w-1/3 gap-1 text-sm font-medium hover:opacity-80'>
                    <Skeleton className='w-1/4 h-6 rounded' />
                    <Skeleton className='w-4 h-6 rounded' />
                </div>
            </div>
            <div className='grid justify-center grid-cols-2 gap-4 mx-auto md:grid-cols-3 2xl:grid-cols-4'>
                {Array.from({ length: 8 }).map((_, index) => (
                    <CategoryCardLoading key={index} />
                ))}
            </div>
        </div>
    );
};

export default CategorySectionLoading;
