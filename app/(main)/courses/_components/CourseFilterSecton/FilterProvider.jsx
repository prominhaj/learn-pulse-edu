"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useMemo, useState } from "react";

export const FilterContext = createContext(null);

const FilterProvider = ({ children }) => {
    const searchParams = useSearchParams();

    // Initialize categories and selectedPrice using useMemo
    const categories = useMemo(() => searchParams.get('categories')?.split(',') || [], [searchParams]);
    const selectedPrice = useMemo(() => searchParams.get('price') || '', [searchParams]);

    // State for selected categories and price
    const [selectCategories, setSelectCategories] = useState(categories);
    const [selectPrice, setSelectPrice] = useState(selectedPrice);

    return (
        <FilterContext.Provider value={[selectCategories, setSelectCategories, selectPrice, setSelectPrice]}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterProvider;