import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ProfilePhoto from '@/assets/my-profile-photo.png';
import Footer from './_components/Footer';

export default function BlogPage() {
    return (
        <div className='flex flex-col min-h-screen'>
            <header className='container py-4 mx-auto'>
                <div className='flex items-center justify-between px-6'>
                    <h2 className='text-xl font-bold'>Blog</h2>
                    <Button variant='primary' className=''>
                        New Post
                    </Button>
                </div>
            </header>
            <div className='container mx-auto grid grid-cols-[280px_1fr] gap-8 py-8'>
                <div className='space-y-6'>
                    <div className='p-6 rounded-lg shadow bg-background'>
                        <h3 className='mb-2 text-lg font-semibold'>Categories</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-foreground'
                                    prefetch={false}
                                >
                                    Technology
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-foreground'
                                    prefetch={false}
                                >
                                    Design
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-foreground'
                                    prefetch={false}
                                >
                                    Lifestyle
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-foreground'
                                    prefetch={false}
                                >
                                    Travel
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='p-6 rounded-lg shadow bg-background'>
                        <h3 className='mb-2 text-lg font-semibold'>Tags</h3>
                        <div className='flex flex-wrap gap-2'>
                            <Link
                                href='#'
                                className='px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/80'
                                prefetch={false}
                            >
                                React
                            </Link>
                            <Link
                                href='#'
                                className='px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/80'
                                prefetch={false}
                            >
                                CSS
                            </Link>
                            <Link
                                href='#'
                                className='px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/80'
                                prefetch={false}
                            >
                                JavaScript
                            </Link>
                            <Link
                                href='#'
                                className='px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/80'
                                prefetch={false}
                            >
                                Design
                            </Link>
                            <Link
                                href='#'
                                className='px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/80'
                                prefetch={false}
                            >
                                Productivity
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='space-y-8'>
                    <div className='p-6 rounded-lg shadow bg-background'>
                        <div className='flex items-center mb-4'>
                            <Image
                                src={ProfilePhoto}
                                alt='Author Avatar'
                                className='w-10 h-10 mr-3 rounded-full'
                                width={40}
                                height={40}
                            />
                            <div>
                                <h3 className='text-lg font-semibold'>John Doe</h3>
                                <p className='text-sm text-muted-foreground'>May 1, 2023</p>
                            </div>
                        </div>
                        <h2 className='mb-2 text-2xl font-bold'>
                            <Link href='#' className='hover:text-primary' prefetch={false}>
                                The Future of Web Development
                            </Link>
                        </h2>
                        <p className='mb-4 text-muted-foreground'>
                            In this article, we explore the latest trends and technologies shaping
                            the future of web development. From the rise of serverless architectures
                            to the growing importance of accessibility, we dive into the key factors
                            that will influence the way we build websites and web applications.
                        </p>
                        <Link
                            href='#'
                            className='font-medium text-primary hover:underline'
                            prefetch={false}
                        >
                            Read More
                        </Link>
                    </div>
                    <div className='p-6 rounded-lg shadow bg-background'>
                        <div className='flex items-center mb-4'>
                            <Image
                                src={ProfilePhoto}
                                alt='Author Avatar'
                                className='w-10 h-10 mr-3 rounded-full'
                                width={40}
                                height={40}
                            />
                            <div>
                                <h3 className='text-lg font-semibold'>Jane Smith</h3>
                                <p className='text-sm text-muted-foreground'>April 15, 2023</p>
                            </div>
                        </div>
                        <h2 className='mb-2 text-2xl font-bold'>
                            <Link href='#' className='hover:text-primary' prefetch={false}>
                                Mastering the Art of Minimalist Design
                            </Link>
                        </h2>
                        <p className='mb-4 text-muted-foreground'>
                            In this article, we explore the principles of minimalist design and how
                            to apply them to your web projects. From decluttering your interfaces to
                            focusing on essential elements, well share practical tips to help you
                            create clean, elegant, and user-friendly designs.
                        </p>
                        <Link
                            href='#'
                            className='font-medium text-primary hover:underline'
                            prefetch={false}
                        >
                            Read More
                        </Link>
                    </div>
                    <div className='p-6 rounded-lg shadow bg-background'>
                        <div className='flex items-center mb-4'>
                            <Image
                                src={ProfilePhoto}
                                alt='Author Avatar'
                                className='w-10 h-10 mr-3 rounded-full'
                                width={40}
                                height={40}
                            />
                            <div>
                                <h3 className='text-lg font-semibold'>Michael Johnson</h3>
                                <p className='text-sm text-muted-foreground'>March 28, 2023</p>
                            </div>
                        </div>
                        <h2 className='mb-2 text-2xl font-bold'>
                            <Link href='#' className='hover:text-primary' prefetch={false}>
                                The Rise of Remote Work: Navigating the New Normal
                            </Link>
                        </h2>
                        <p className='mb-4 text-muted-foreground'>
                            In this article, we explore the impact of the COVID-19 pandemic on the
                            way we work and the rise of remote work. Well discuss the challenges and
                            opportunities of working from home, as well as strategies for
                            maintaining productivity and work-life balance in the new normal.
                        </p>
                        <Link
                            href='#'
                            className='font-medium text-primary hover:underline'
                            prefetch={false}
                        >
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
