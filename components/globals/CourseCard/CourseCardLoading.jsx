import { Skeleton } from "@/components/ui/skeleton";

const CourseCardLoading = () => {
    return (
        <div className="h-full p-3 overflow-hidden transition border rounded-lg bg-background group hover:shadow-sm">
            <div className="relative w-full overflow-hidden rounded-md aspect-video">
                <Skeleton className="h-full" />
            </div>
            <div className="flex flex-col pt-3">
                <div className="text-lg font-medium md:text-base group-hover:text-sky-700 dark:group-hover:text-sky-500 line-clamp-2">
                    <Skeleton className="w-3/4 h-5 rounded" />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                    <Skeleton className="w-1/4 h-3 rounded" />
                </div>
                <div className="flex items-center w-full my-3 text-sm gap-x-2 md:text-xs">
                    <div className="flex items-center w-full gap-x-1 text-slate-500">
                        <Skeleton className="w-5 h-4 rounded" />
                        <Skeleton className="w-1/4 h-3 rounded" />
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <Skeleton className="w-16 h-6 rounded" />
                    <Skeleton className="w-16 h-6 rounded" />
                </div>
            </div>
        </div>
    );
};

export default CourseCardLoading;