"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter, Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

// PRICE INFO
const PRICE_OPTIONS = [
    { label: 'Free', value: 'free' },
    { label: 'Paid', value: 'paid' }
];

const SORT_OPTIONS = [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' }
];

const CATEGORY_OPTIONS = [
    {
        id: 1,
        label: 'Design',
        value: 'design'
    },

    {
        id: 3,
        label: 'Development',
        value: 'development'
    },
    {
        id: 4,
        label: 'Marketing',
        value: 'marketing'
    },
    {
        id: 5,
        label: 'IT & Software',
        value: 'it-software'
    },
    {
        id: 6,
        label: 'Personal Development',
        value: 'personal-development'
    },
    {
        id: 7,
        label: 'Business',
        value: 'business'
    },
    {
        id: 8,
        label: 'Photography',
        value: 'photography'
    },
    {
        id: 9,
        label: 'Music',
        value: 'music'
    }
];


const CourseFilterSection = ({ children }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const search = searchParams.get('s');

    // Filter by course
    const [filter, setFilter] = useState({
        categories: ['development'],
        price: ['free'],
        sort: ''
    });

    //   apply checkbox filter
    const applyArrayFilter = ({ type, value }) => {
        const isFilterApplied = filter[type].includes(value);

        if (isFilterApplied) {
            setFilter((prev) => ({
                ...prev,
                [type]: prev[type].filter((v) => v !== value)
            }));
        } else {
            setFilter((prev) => ({
                ...prev,
                [type]: [...prev[type], value]
            }));
        }
    };

    useEffect(() => {
        if (!search) {
            router.replace(pathname)
        }
    }, [search, pathname, router])


    // Handle Search On Change
    const handleSearchChange = useCallback(
        (e) => {

            const text = e.target.value;
            const params = new URLSearchParams(searchParams.toString())
            params.set("s", text)

            router.replace(pathname + '?' + params.toString())
        },
        [searchParams, pathname, router]
    )

    return (
        <>
            {/* header */}
            <div className='flex flex-col items-baseline justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-600 lg:flex-row'>
                <div className='relative h-10 max-lg:w-full'>
                    <Search className='absolute z-10 w-4 h-4 text-gray-500 transform -translate-y-1/2 left-3 top-1/2' />
                    <Input
                        onChange={handleSearchChange}
                        type='text'
                        placeholder='Search courses...'
                        className='py-2 pl-8 pr-3 text-sm'
                    />
                </div>

                <div className='flex items-center justify-end gap-2 max-lg:w-full'>
                    <Select>
                        <SelectTrigger className='w-[180px] border-none !border-b focus:ring-0 focus:ring-offset-0  overflow-hidden'>
                            <SelectValue placeholder='Sort By' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Price</SelectLabel>
                                {SORT_OPTIONS.map((option) => (
                                    <SelectItem
                                        className='cursor-pointer'
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Filter Menus For Mobile */}

                    <div className='lg:hidden'>
                        <Sheet>
                            <SheetTrigger>
                                <Filter className='w-6 h-6' />
                            </SheetTrigger>
                            <SheetContent side='left'>
                                <SheetHeader>
                                    <SheetTitle className='text-left'>Filter Courses</SheetTitle>
                                    <Accordion defaultValue={['categories']} type='multiple'>
                                        {/* Categories filter */}
                                        <AccordionItem value='categories'>
                                            <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                                                <span className='font-medium text-gray-900 dark:text-gray-100'>
                                                    Categories
                                                </span>
                                            </AccordionTrigger>

                                            <AccordionContent className='pt-6 animate-none'>
                                                <ul className='space-y-4'>
                                                    {CATEGORY_OPTIONS.map((option, optionIdx) => (
                                                        <li
                                                            key={option.value}
                                                            className='flex items-center'
                                                        >
                                                            <Checkbox
                                                                type='checkbox'
                                                                id={`category-${optionIdx}`}
                                                                onCheckedChange={() => {
                                                                    applyArrayFilter({
                                                                        type: 'categories',
                                                                        value: option.value
                                                                    });
                                                                }}
                                                                checked={filter.categories.includes(
                                                                    option.value
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor={`category-${optionIdx}`}
                                                                className='ml-3 text-sm text-gray-600 cursor-pointer dark:text-gray-300'
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                        {/* Price filter */}
                                        <AccordionItem value='price'>
                                            <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                                                <span className='font-medium text-gray-900 dark:text-gray-100'>
                                                    Price
                                                </span>
                                            </AccordionTrigger>

                                            <AccordionContent className='pt-6 animate-none'>
                                                <ul className='space-y-4'>
                                                    {PRICE_OPTIONS.map((option, optionIdx) => (
                                                        <li
                                                            key={option.value}
                                                            className='flex items-center'
                                                        >
                                                            <Checkbox
                                                                type='checkbox'
                                                                id={`price-${optionIdx}`}
                                                                onCheckedChange={() => {
                                                                    applyArrayFilter({
                                                                        type: 'price',
                                                                        value: option.value
                                                                    });
                                                                }}
                                                                checked={filter.price.includes(
                                                                    option.value
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor={`price-${optionIdx}`}
                                                                className='ml-3 text-sm text-gray-600 cursor-pointer dark:text-gray-300'
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
            {/* header ends */}
            {/* active filters */}
            <div className='flex flex-wrap items-center gap-2'>
                {/* active categories */}
                {filter.categories.length > 0 &&
                    filter.categories.map((category) => (
                        <Button
                            key={category}
                            variant='ghost'
                            className='gap-1 text-xs rounded-full h-7 bg-muted dark:hover:text-white text-sky-700 dark:text-sky-500'
                            onClick={() =>
                                applyArrayFilter({ type: 'categories', value: category })
                            }
                        >
                            {category}
                            <X className='w-3' />
                        </Button>
                    ))}
                {/* active prices */}
                {filter.price.length > 0 &&
                    filter.price.map((price) => (
                        <Button
                            key={price}
                            variant='ghost'
                            className='gap-1 text-xs rounded-full h-7 bg-muted dark:hover:text-white text-sky-700 dark:text-sky-500'
                            onClick={() => applyArrayFilter({ type: 'price', value: price })}
                        >
                            {price}
                            <X className='w-3' />
                        </Button>
                    ))}
            </div>

            <section className='pt-6 pb-24'>
                <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
                    {/* Filters */}
                    {/* these component can be re use for mobile also */}
                    <div className='hidden lg:block'>
                        <Accordion defaultValue={['categories']} type='multiple'>
                            {/* Categories filter */}
                            <AccordionItem value='categories'>
                                <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                                    <span className='font-medium text-gray-900 dark:text-gray-100'>Categories</span>
                                </AccordionTrigger>

                                <AccordionContent className='pt-6 animate-none'>
                                    <ul className='space-y-4'>
                                        {CATEGORY_OPTIONS.map((option, optionIdx) => (
                                            <li key={option.value} className='flex items-center'>
                                                <Checkbox
                                                    type='checkbox'
                                                    id={`category-${optionIdx}`}
                                                    onCheckedChange={() => {
                                                        applyArrayFilter({
                                                            type: 'categories',
                                                            value: option.value
                                                        });
                                                    }}
                                                    checked={filter.categories.includes(
                                                        option.value
                                                    )}
                                                />
                                                <label
                                                    htmlFor={`category-${optionIdx}`}
                                                    className='ml-3 text-sm text-gray-600 cursor-pointer dark:text-gray-300'
                                                >
                                                    {option.label}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            {/* Price filter */}
                            <AccordionItem value='price'>
                                <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                                    <span className='font-medium text-gray-900 dark:text-gray-100'>Price</span>
                                </AccordionTrigger>

                                <AccordionContent className='pt-6 animate-none'>
                                    <ul className='space-y-4'>
                                        {PRICE_OPTIONS.map((option, optionIdx) => (
                                            <li key={option.value} className='flex items-center'>
                                                <Checkbox
                                                    type='checkbox'
                                                    id={`price-${optionIdx}`}
                                                    onCheckedChange={() => {
                                                        applyArrayFilter({
                                                            type: 'price',
                                                            value: option.value
                                                        });
                                                    }}
                                                    checked={filter.price.includes(option.value)}
                                                />
                                                <label
                                                    htmlFor={`price-${optionIdx}`}
                                                    className='ml-3 text-sm text-gray-600 cursor-pointer dark:text-gray-300'
                                                >
                                                    {option.label}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    {/* Course */}
                    {children}
                </div>
            </section>
        </>
    );
};

export default CourseFilterSection;