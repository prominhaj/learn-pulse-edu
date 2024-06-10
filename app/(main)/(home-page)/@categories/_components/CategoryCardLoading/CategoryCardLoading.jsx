import { Skeleton } from "@/components/ui/skeleton";

const CategoryCardLoading = () => {
    return (
        <div className="relative p-2 overflow-hidden transition-all duration-500 ease-in-out border rounded-lg bg-background">
            <div className="flex flex-col items-center justify-between gap-4 p-6 rounded-md">
                <Skeleton className="w-24 h-24 rounded" />
                <Skeleton className="w-2/3 h-4 rounded" />
            </div>
        </div>
    );
};

export default CategoryCardLoading;