import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const CourseInfo = ({ course }) => {
    const {
        id,
        title,
        sub_title,
        thumbnail: { url }
    } = course;

    return (
        <div className='overflow-x-hidden'>
            <section className='py-12 sm:py-16'>
                <div className='container'>
                    <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                        <div className='max-w-2xl mx-auto text-center'>
                            <h1 className='px-6 text-lg text-gray-600 dark:text-gray-400 font-inter'>
                                {sub_title}
                            </h1>
                            <p className='mt-5 text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-poppins'>
                                <span className='relative inline-flex sm:inline'>
                                    {/* <span className='bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0'></span> */}
                                    <span className='relative'>{title}</span>
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Back Ground Gray din */}
                    <>
                        <div
                            aria-hidden='true'
                            className='absolute inset-x-0 overflow-hidden pointer-events-none -top-16 -z-10 transform-gpu blur-3xl sm:-top-40'
                        >
                            <div
                                style={{
                                    clipPath:
                                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                                }}
                                className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:bg-gray-800'
                            />
                        </div>
                    </>

                    <div className='mt-6'>
                        <div className='relative'>
                            <div className='absolute inset-0 h-2/3'></div>
                            <div className='relative mx-auto'>
                                <div className='lg:max-w-3xl lg:mx-auto'>
                                    <Image
                                        className='w-full h-full rounded-lg'
                                        width={800}
                                        height={500}
                                        src={url}
                                        alt={title}
                                        quality={100}
                                        placeholder='blur'
                                        blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvXd1PQAGwgKUFYvW8AAAAABJRU5ErkJggg=='
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap items-center justify-center gap-3 mt-6'>
                        <Link href='' className={cn(buttonVariants({ size: 'lg' }))}>
                            Enroll Now
                        </Link>
                        <Link
                            href=''
                            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
                        >
                            See Intro
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CourseInfo;