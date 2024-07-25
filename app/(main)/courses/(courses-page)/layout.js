import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import ShowFilterAction from '../_components/CourseFilterSecton/ShowFilterAction';
import FilterSection from '../_components/CourseFilterSecton/FilterSection';
import SortPrice from '../_components/SortPrice';
import SearchBox from '../_components/SearchBox';
import { getCategories } from '@/queries/categories';
import FilterProvider from '../_components/CourseFilterSecton/FilterProvider';
import { Suspense } from 'react';

// Metadata
export const metadata = {
    title: 'Courses - Learn Pulse Edu',
    description: 'Explore || Learn || Build || Share || Courses'
};

const CoursesLayout = async ({ courses }) => {
    const categories = await getCategories();
    const formatCategories = categories?.map((category) => {
        return {
            value: category?.title,
            label: category?.title
        };
    });

    return (
        <>
            <FilterProvider>
                <section className='container py-6 space-y-6 dark:bg-transparent'>
                    {/* gradient color */}
                    <div
                        aria-hidden='true'
                        className='absolute inset-x-0 overflow-hidden pointer-events-none -top-40 -z-10 transform-gpu blur-3xl sm:-top-80'
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                            }}
                            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:bg-gray-800'
                        />
                    </div>

                    <h2 className='!m-0 text-xl font-medium md:text-2xl'>All Courses</h2>

                    <div className='grid items-center justify-between grid-cols-1 gap-3 lg:grid-cols-3'>
                        <Suspense fallback={<>loading...</>}>
                            <SearchBox />
                        </Suspense>
                        <div className='flex items-center justify-end gap-3 max-lg:w-full lg:col-span-2'>
                            <Suspense fallback={<>loading...</>}>
                                <SortPrice />
                            </Suspense>
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
                                            <Suspense fallback={<>loading...</>}>
                                                <FilterSection categoryOptions={formatCategories} />
                                            </Suspense>
                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>

                    {/* Filter Action Show */}
                    <ShowFilterAction />

                    <section className='pb-16 md:pt-2 md:pb-24'>
                        <div className='flex items-start gap-8'>
                            {/* Filters */}
                            <div className='hidden w-60 lg:block'>
                                <Suspense fallback={<>loading...</>}>
                                    <FilterSection categoryOptions={formatCategories} />
                                </Suspense>
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
