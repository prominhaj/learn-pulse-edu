import { Skeleton } from "@/components/ui/skeleton";
import CategoryCardLoading from "../CategoryCardLoading/CategoryCardLoading";


const CategorySectionLoading = () => {
    return (
        <section id='categories' className='container py-8 space-y-6 md:py-12 lg:py-24'>
            <div className='flex items-center justify-between'>
                <Skeleton className='w-1/4 h-6' />
                <Skeleton className='w-1/5 h-4' />
            </div>
            <div className='grid justify-center grid-cols-2 gap-4 mx-auto md:grid-cols-3 2xl:grid-cols-4'>
                <CategoryCardLoading />
                <CategoryCardLoading />
                <CategoryCardLoading />
                <CategoryCardLoading />
                <CategoryCardLoading />
                <CategoryCardLoading />
                <CategoryCardLoading />
                <CategoryCardLoading />
            </div>
        </section>
    );
};

export default CategorySectionLoading;