"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const SearchBox = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [search, setSearch] = useState(searchParams.get('s') || '');
    const [query] = useDebounce(search, 500);

    // Handle Search On Change
    const handleSearchChange = useCallback((e) => {
        const text = e.target.value;
        setSearch(text);
    }, []);

    // Update URL parameter 's' when search changes
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (search !== '') {
            params.set("s", query);
        } else {
            params.delete("s");
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, [query, searchParams, pathname, router, search]);

    return (
        <div className='relative h-10 max-lg:w-full'>
            <Search className='absolute z-10 w-4 h-4 text-gray-500 transform -translate-y-1/2 left-3 top-1/2' />
            <Input
                value={search}
                onChange={handleSearchChange}
                type='text'
                placeholder='Search courses...'
                className='py-2 pl-8 pr-3 text-sm'
            />
        </div>
    );
};

export default SearchBox;
