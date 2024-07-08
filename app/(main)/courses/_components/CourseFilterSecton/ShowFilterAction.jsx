"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FilterContext } from "./FilterProvider";

const ShowFilterAction = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [selectCategories, setSelectCategories, selectPrice, setSelectPrice] = useContext(FilterContext);

    // Update URL params when selectCategories or selectPrice change
    useEffect(() => {
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

        router.replace(`${pathname}?${params.toString()}`);
    }, [selectCategories, selectPrice, pathname, router]);

    // Handler for updating selected categories
    const handleCategoryClick = (category) => {
        const updatedCategories = [...selectCategories];
        const index = updatedCategories.indexOf(category);
        if (index === -1) {
            updatedCategories.push(category);
        } else {
            updatedCategories.splice(index, 1);
        }
        setSelectCategories(updatedCategories);
    };

    // Handler for updating selected price
    const handlePriceClick = (price) => {
        if (price === selectPrice) {
            setSelectPrice('');
        } else {
            setSelectPrice(price);
        }
    };

    // Render active filters with remove buttons
    return (
        <div className='flex flex-wrap items-center gap-2'>
            {/* Active categories */}
            {selectCategories.map((category) => (
                <Button
                    key={category}
                    variant='ghost'
                    className='gap-1 text-xs rounded-full h-7 bg-muted dark:hover:text-white text-sky-700 dark:text-sky-500'
                    onClick={() => handleCategoryClick(category)}
                >
                    {category}
                    <X className='w-3' />
                </Button>
            ))}
            {/* Active price */}
            {selectPrice && (
                <Button
                    key={selectPrice}
                    variant='ghost'
                    className='gap-1 text-xs rounded-full h-7 bg-muted dark:hover:text-white text-sky-700 dark:text-sky-500'
                    onClick={() => handlePriceClick(selectPrice)}
                >
                    {selectPrice}
                    <X className='w-3' />
                </Button>
            )}
        </div>
    );
};

export default ShowFilterAction;
