import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const HeroSection = () => {
    return (
        <>

            <section className="pt-6 pb-8 space-y-6 md:pb-12 md:pt-10 lg:py-40 relative lg:-mt-16 w-full overflow-hidden overflow-x-clip bg-slate-50 bg-gradient-to-t from-slate-50 to-slate-100 dark:bg-[#0B1120] dark:bg-none">
                <div className="absolute right-[28%] top-0 hidden h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-blue-600 to-sky-400 opacity-20 blur-3xl filter dark:block dark:opacity-30 lg:top-44 lg:-right-20 lg:h-72 lg:w-[350px] xl:h-80 xl:w-[500px]">
                </div>
                <div className="absolute bottom-44 -left-64 hidden h-[150px] w-[900px] -rotate-45 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-800 opacity-30 blur-3xl filter dark:block lg:bottom-24 lg:-left-20 lg:h-28 lg:w-[250px] lg:-rotate-12 lg:opacity-20 xl:h-40 xl:w-[400px]"></div>
                <div className="absolute left-[28%] top-28 hidden rotate-12 rounded-3xl bg-sky-800 opacity-90 blur-3xl filter dark:opacity-30 lg:h-32 lg:w-[450px] dark:lg:block xl:h-44 xl:w-[600px]"></div>
                <div className="absolute h-16 w-[600px] rotate-[-40deg] rounded-3xl bg-sky-400 opacity-10 blur-2xl filter dark:hidden lg:bottom-24 lg:-left-28 lg:h-12 lg:w-[600px] lg:opacity-30 lg:blur-2xl xl:-left-40 xl:h-4 xl:w-[700px] xl:opacity-100"></div>
                <div className="absolute h-14 w-[600px] rotate-[-40deg] rounded-3xl bg-purple-400 opacity-30 blur-2xl filter dark:hidden lg:bottom-20 lg:-left-28 lg:h-10 lg:w-[600px] lg:opacity-20 lg:blur-xl xl:-left-40 xl:h-2 xl:w-[800px] xl:opacity-100"></div>
                <div className="absolute hidden h-16 w-[600px] rotate-[-40deg] rounded-3xl bg-sky-400 opacity-10 blur-2xl filter dark:hidden lg:top-24 lg:-right-28 lg:block lg:h-12 lg:w-[600px] lg:opacity-30 lg:blur-2xl xl:-right-40 xl:h-4 xl:w-[700px] xl:opacity-100"></div>
                <div className="absolute hidden h-14 w-[600px] rotate-[-40deg] rounded-3xl bg-purple-400 opacity-30 blur-2xl filter dark:hidden lg:top-20 lg:-right-28 lg:block lg:h-10 lg:w-[600px] lg:opacity-20 lg:blur-xl xl:-right-40 xl:h-2 xl:w-[800px] xl:opacity-100"></div>

                {/* Content */}

                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">

                    <span className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium border shadow-lg">
                        Hey, Welcome
                    </span>
                    <h1 className="text-3xl font-bold font-heading sm:text-5xl md:text-6xl lg:text-7xl">
                        Learn Today, Lead Tomorrow.
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        “You don’t understand anything until you learn it more than one
                        way.”
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link href="/courses" className={cn(buttonVariants({ size: "lg" }))}>
                            Explore Now
                        </Link>
                        <Link
                            href="/register/instructor"
                            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                        >
                            Become An Instructor
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSection;