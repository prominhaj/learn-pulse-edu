import { Skeleton } from "@/components/ui/skeleton";

const HeroSectionLoading = () => {
    return (
        <section className="pt-6 pb-8 space-y-6 md:pb-12 md:pt-10 lg:py-32">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center relative isolate">
                <div aria-hidden="true" className="absolute inset-x-0 overflow-hidden pointer-events-none -top-40 -z-10 transform-gpu blur-3xl sm:-top-80">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:bg-gray-800"></div>
                </div>
                <Skeleton className="h-7 w-28 rounded-2xl" />
                <Skeleton className="w-1/2 h-16" />
                <Skeleton className="w-1/2 h-8" />
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <Skeleton className="w-32 h-8 rounded-md" />
                    <Skeleton className="w-48 h-8 rounded-md" />
                </div>
            </div>
        </section>
    );
};

export default HeroSectionLoading;