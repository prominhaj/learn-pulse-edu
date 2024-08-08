"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useCallback } from 'react';

const CoursePagination = ({ currentPage, totalPages }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const goToPage = useCallback((page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        router.replace(`${pathname}?${params.toString()}`);
    }, [searchParams, pathname, router]);

    return (
        <div className="flex justify-center my-4">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </PaginationPrevious>
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink
                                    onClick={() => goToPage(pageNumber)}
                                    isActive={pageNumber === currentPage}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    {totalPages > 5 && currentPage < totalPages - 3 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </PaginationNext>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default CoursePagination;
