import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import ShowFilterAction from '../_components/CourseFilterSecton/ShowFilterAction';
import FilterSection from '../_components/CourseFilterSecton/FilterSection';
import SortPrice from '../_components/SortPrice';
import SearchBox from '../_components/SearchBox';
import { getCategories } from '@/queries/categories';
import FilterProvider from '../_components/CourseFilterSecton/FilterProvider';

// Metadata
export const metadata = {
    title: 'Courses - Learn Pulse Edu',
    description: 'Explore || Learn || Build || Share || Courses'
};

const CoursesLayout = async ({ courses }) => {
    const categories = await getCategories();
    const formatCategories = categories?.map((category) => {
        return {
            value: category?.title?.toLowerCase(),
            label: category?.title
        };
    });

    return (
        <>
            <FilterProvider>
                <section id='courses' className='container py-6 space-y-6 dark:bg-transparent'>
                    <h2 className='text-xl font-medium md:text-2xl'>All Courses</h2>

                    <div className='grid items-center justify-between grid-cols-1 gap-3 lg:grid-cols-2'>
                        <div className=''>
                            <SearchBox />
                        </div>
                        <div className='flex items-center justify-end gap-3 max-lg:w-full'>
                            <SortPrice />
                            {/* Filter Menus For Mobile */}
                            <div className='lg:hidden'>
                                <Sheet>
                                    <SheetTrigger>
                                        <Filter className='w-6 h-6' />
                                    </SheetTrigger>
                                    <SheetContent side='left'>
                                        <SheetHeader>
                                            <SheetTitle className='text-left'>
                                                Filter Courses
                                            </SheetTitle>
                                            <FilterSection categoryOptions={formatCategories} />
                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>

                    {/* Filter Action Show */}
                    <ShowFilterAction />

                    <section className='pt-2 pb-16 md:pb-24'>
                        <div className='flex items-start gap-8'>
                            {/* Filters */}
                            <div className='hidden w-60 lg:block'>
                                <FilterSection categoryOptions={formatCategories} />
                            </div>
                            {/* Course */}
                            <div className='flex-1'>{courses}</div>
                        </div>
                    </section>
                </section>
            </FilterProvider>
        </>
    );
};

export default CoursesLayout;
