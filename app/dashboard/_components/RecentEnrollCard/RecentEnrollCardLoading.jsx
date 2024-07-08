import { Skeleton } from "@/components/ui/skeleton";

const RecentEnrollCardLoading = () => {
    return (
        <div className="flex flex-wrap items-center w-full gap-2 sm:gap-3 md:gap-4 animate-pulse">
            <Skeleton className="rounded-full h-9 w-9" />
            <div className="flex flex-col flex-1 gap-1">
                <Skeleton className="w-1/4 h-4 rounded" />
                <Skeleton className="w-1/2 h-4 rounded" />
            </div>
            <Skeleton className="w-1/6 h-6 ml-auto rounded" />
        </div>
    );
};

export default RecentEnrollCardLoading;