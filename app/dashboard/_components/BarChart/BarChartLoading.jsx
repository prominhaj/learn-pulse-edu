import { Skeleton } from "@/components/ui/skeleton";

const BarChartLoading = () => {
    return (
        <div className="flex flex-row items-center justify-between p-6 pb-2 space-y-0 border shadow animate-pulse rounded-xl bg-card text-card-foreground">
            <div className="h-[18rem] sm:h-[25rem] md:h-[30rem] lg:h-[37.5rem] flex w-full items-end gap-3">
                <Skeleton className="w-[4.375rem] rounded h-3/4" />
                <Skeleton className="w-[4.375rem] rounded h-1/2" />
                <Skeleton className="w-[4.375rem] rounded h-2/3" />
                <Skeleton className="w-[4.375rem] rounded h-1/2" />
                <Skeleton className="w-[4.375rem] rounded h-3/4" />
                <Skeleton className="w-[4.375rem] rounded h-3/4" />
                <Skeleton className="w-[4.375rem] rounded h-1/2" />
                <Skeleton className="w-[4.375rem] rounded h-2/3" />
                <Skeleton className="w-[4.375rem] rounded h-1/2" />
                <Skeleton className="w-[4.375rem] rounded h-2/4" />
                <Skeleton className="w-[4.375rem] rounded h-3/4" />
                <Skeleton className="w-[4.375rem] rounded h-1/4" />
            </div>
        </div>
    );
};

export default BarChartLoading;