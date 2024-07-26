import { Skeleton } from "@/components/ui/skeleton";

const StudentCardLoading = () => {
    return (
        <div className="p-3 transition-all duration-500 ease-in-out border rounded-md md:p-5 bg-background">
            <div className="flex flex-col items-center justify-center gap-3 pb-2 border-b">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="flex flex-col items-center justify-center w-full gap-1">
                    <Skeleton className="w-3/5 h-5 mb-2 rounded" />
                    <Skeleton className="w-2/3 h-3 mb-2 rounded" />
                    <Skeleton className="w-2/5 h-3 rounded" />
                </div>
            </div>
            <div className="pt-2 space-y-1.5 text-muted-foreground">
                <Skeleton className="h-4 mb-1 rounded" />
                <Skeleton className="h-4 mb-1 rounded" />
                <div className="mt-2 border-t">
                    <Skeleton className="h-3 mt-1 rounded" />
                    <Skeleton className="h-3 mt-1 rounded" />
                    <Skeleton className="h-3 mt-1 rounded" />
                    <Skeleton className="h-3 mt-1 rounded" />
                </div>
            </div>
        </div>
    );
};

export default StudentCardLoading;