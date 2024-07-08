"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const SearchBox = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const search = searchParams.get('s');

    // Handle Search On Change
    const handleSearchChange = useCallback(
        (e) => {
            const text = e.target.value.trim();

            if (text !== '') {
                const params = new URLSearchParams(searchParams.toString());
                params.set("s", text);
                router.replace(pathname + '?' + params.toString());
            } else {
                const params = new URLSearchParams(searchParams.toString());
                params.delete("s");
                router.replace(pathname + '?' + params.toString());
            }
        },
        [searchParams, pathname, router]
    );

    return (
        <div className='relative h-10 max-lg:w-full'>
            <Search className='absolute z-10 w-4 h-4 text-gray-500 transform -translate-y-1/2 left-3 top-1/2' />
            <Input
                defaultValue={search}
                onChange={handleSearchChange}
                type='text'
                placeholder='Search courses...'
                className='py-2 pl-8 pr-3 text-sm'
            />
        </div>
    );
};

export default SearchBox;
