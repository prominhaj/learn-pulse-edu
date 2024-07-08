"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FilterContext } from "./FilterProvider";

const PRICE_OPTIONS = [
    { label: 'Free', value: 'free' },
    { label: 'Paid', value: 'paid' }
];

const FilterSection = ({ categoryOptions }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [selectCategories, setSelectCategories, selectPrice, setSelectPrice] = useContext(FilterContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams();
            if (selectCategories.length > 0) {
                params.set('categories', selectCategories.join(','));
            } else {
                params.delete('categories');
            }
            if (selectPrice) {
                params.set('price', selectPrice);
            } else {
                params.delete('price');
            }
            router.push(`${pathname}?${params.toString()}`);
        }, 300);

        return () => clearTimeout(timer);
    }, [selectCategories, selectPrice, pathname, router]);

    const handleChangeCategory = (value) => {
        const updatedCategories = [...selectCategories];
        const index = updatedCategories.indexOf(value);
        if (index === -1) {
            updatedCategories.push(value);
        } else {
            updatedCategories.splice(index, 1);
        }
        setSelectCategories(updatedCategories);
    };

    const handlePriceChange = (value) => {
        if (value === selectPrice) {
            setSelectPrice('');
        } else {
            setSelectPrice(value);
        }
    };

    return (
        <Accordion defaultValue={['categories']} type='multiple'>
            {/* Categories filter */}
            <AccordionItem value='categories'>
                <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                    <span className='font-medium text-gray-900 dark:text-gray-100'>Categories</span>
                </AccordionTrigger>

                <AccordionContent className='pt-6 animate-none'>
                    <ul className='space-y-4'>
                        {categoryOptions?.map((option, optionIdx) => (
                            <li key={option.value} className='flex items-center'>
                                <Checkbox
                                    type='checkbox'
                                    id={`category-${optionIdx}`}
                                    onCheckedChange={() => handleChangeCategory(option.value)}
                                    checked={selectCategories.includes(option.value)}
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
                        {PRICE_OPTIONS?.map((option, optionIdx) => (
                            <li key={option.value} className='flex items-center'>
                                <Checkbox
                                    type='checkbox'
                                    id={`price-${optionIdx}`}
                                    onCheckedChange={() => handlePriceChange(option.value)}
                                    checked={selectPrice === option.value}
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
    );
};

export default FilterSection;
