import { Skeleton } from "@/components/ui/skeleton";

const InstructorCardLoading = () => {
    return (
        <div className="flex flex-col justify-between w-full border shadow rounded-xl">
            <div className="space-y-1.5 p-6 flex flex-col items-center">
                <Skeleton className="relative flex w-20 h-20 overflow-hidden rounded-full shrink-0" />
                <div className="mt-4 flex flex-col gap-1.5 items-center w-full">
                    <Skeleton className="w-1/2 h-4 rounded" />
                    <Skeleton className="w-3/4 h-4 rounded" />
                    <Skeleton className="w-1/3 h-4 rounded" />
                </div>
            </div>
            <div className="p-6 space-y-4">
                <div>
                    <Skeleton className="w-1/2 h-4 rounded" />
                    <Skeleton className="w-full h-4 mt-1 rounded" />
                    <Skeleton className="w-3/4 h-4 mt-1 rounded" />
                </div>
            </div>
            <div className="flex items-center p-6 pt-0">
                <Skeleton className="w-full h-9 rounded-3xl" />
            </div>
        </div>
    );
};

export default InstructorCardLoading;