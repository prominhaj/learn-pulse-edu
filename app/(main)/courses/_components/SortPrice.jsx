"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' }
];

const SortPrice = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const sortValue = useMemo(() => searchParams.get('sort') || '', [searchParams]);

    const updateSortParams = useCallback((value) => {
        const currentParams = new URLSearchParams(searchParams);

        if (value) {
            currentParams.set('sort', value);
        } else {
            currentParams.delete('sort');
        }

        router.replace(`${pathname}?${currentParams.toString()}`);
    }, [searchParams, pathname, router]);

    return (
        <>
            <Select value={sortValue} onValueChange={updateSortParams}>
                <SelectTrigger className='w-[180px] border-none !border-b focus:ring-0 focus:ring-offset-0 overflow-hidden'>
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
        </>
    );
};

export default SortPrice;
