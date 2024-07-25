import Image from 'next/image';
import OurMissionImg from '@/assets/Pages/About/our-mission.jpg';
import ProfilePhoto from '@/assets/my-profile-photo.png';

// profile photo
import ProfilePhoto2 from '@/assets/Pages/About/profile-photo-2.jpg';
import ProfilePhoto3 from '@/assets/Pages/About/profile-photo-3.jpg';
import ProfilePhoto4 from '@/assets/Pages/About/profile-photo-4.jpg';

// Metadata
export const metadata = {
    title: 'About - Learn Pulse Edu',
    description: 'Explore || Learn || Build || Share || About'
};

const AboutPage = () => {
    return (
        <div className='flex flex-col min-h-[100dvh]'>
            <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
                <div className='container grid items-center justify-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10'>
                    <div className='flex flex-col items-start space-y-4'>
                        <div className='inline-block px-3 py-1 text-sm rounded-lg bg-primary text-primary-foreground'>
                            About Us
                        </div>
                        <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                            Full Stack Software Solutions
                        </h1>
                        <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                            We are a team of passionate software engineers dedicated to building
                            innovative and user-friendly solutions for our clients.
                        </p>
                    </div>
                    <div className='flex justify-center'>
                        <Image
                            src={ProfilePhoto}
                            width={200}
                            height={200}
                            alt='Profile Photo'
                            className='max-w-[200px] rounded-full'
                        />
                    </div>
                </div>
            </section>
            <section className='w-full py-12 md:py-24 lg:py-32'>
                <div className='container grid items-center justify-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10'>
                    <div className='flex justify-center'>
                        <Image
                            src={OurMissionImg}
                            width={600}
                            height={600}
                            alt='Mission and Values'
                            className='max-w-full rounded-xl'
                        />
                    </div>
                    <div className='flex flex-col items-start space-y-4'>
                        <div className='inline-block px-3 py-1 text-sm rounded-lg bg-primary text-primary-foreground'>
                            Our Mission
                        </div>
                        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                            Empowering Businesses with Innovative Software
                        </h2>
                        <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                            Our mission is to empower businesses of all sizes with cutting-edge
                            software solutions that drive efficiency, productivity, and growth. We
                            believe in the power of technology to transform the way organizations
                            operate and thrive.
                        </p>
                        <div className='inline-block px-3 py-1 text-sm rounded-lg bg-primary text-primary-foreground'>
                            Our Core Values
                        </div>
                        <ul className='grid gap-2 text-muted-foreground'>
                            <li className='flex items-center gap-2'>
                                <CheckIcon className='w-4 h-4 text-primary' />
                                Innovation: We constantly strive to push the boundaries of whats
                                possible with technology.
                            </li>
                            <li className='flex items-center gap-2'>
                                <CheckIcon className='w-4 h-4 text-primary' />
                                Collaboration: We believe in the power of teamwork and fostering a
                                collaborative environment.
                            </li>
                            <li className='flex items-center gap-2'>
                                <CheckIcon className='w-4 h-4 text-primary' />
                                Customer-Centricity: Our clients success is at the heart of
                                everything we do.
                            </li>
                            <li className='flex items-center gap-2'>
                                <CheckIcon className='w-4 h-4 text-primary' />
                                Integrity: We are committed to the highest standards of ethics and
                                professionalism.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
                <div className='container grid items-center justify-center gap-6 px-4 md:px-6'>
                    <div className='flex flex-col items-center justify-center space-y-4 text-center'>
                        <div className='inline-block px-3 py-1 text-sm rounded-lg bg-primary text-primary-foreground'>
                            Our Team
                        </div>
                        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                            Meet the Acme Software Solutions Team
                        </h2>
                        <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                            Our team of talented and dedicated professionals is the driving force
                            behind our success.
                        </p>
                    </div>
                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        <div className='flex flex-col items-center space-y-2'>
                            <Image
                                src={ProfilePhoto}
                                width={150}
                                height={150}
                                alt='Md Minhaj'
                                className='rounded-full'
                            />
                            <div className='text-center'>
                                <h3 className='text-lg font-bold'>Pro Minhaj</h3>
                                <p className='text-muted-foreground'>Co-Founder & CEO</p>
                                <p className='text-sm text-muted-foreground'>
                                    Minhaj is a seasoned entrepreneur with a passion for technology
                                    and a track record of building successful startups.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center space-y-2'>
                            <Image
                                src={ProfilePhoto2}
                                width={150}
                                height={150}
                                alt='Jane Smith'
                                className='rounded-full'
                            />
                            <div className='text-center'>
                                <h3 className='text-lg font-bold'>Jane Smith</h3>
                                <p className='text-muted-foreground'>Co-Founder & CTO</p>
                                <p className='text-sm text-muted-foreground'>
                                    Jane is a highly skilled software engineer with a deep
                                    understanding of cutting-edge technologies and a passion for
                                    building innovative solutions.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center space-y-2'>
                            <Image
                                src={ProfilePhoto3}
                                width={150}
                                height={150}
                                alt='Michael Johnson'
                                className='rounded-full'
                            />
                            <div className='text-center'>
                                <h3 className='text-lg font-bold'>Michael Johnson</h3>
                                <p className='text-muted-foreground'>Lead Developer</p>
                                <p className='text-sm text-muted-foreground'>
                                    Michael is a seasoned developer with a strong background in
                                    full-stack engineering and a track record of delivering
                                    high-quality software solutions.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center space-y-2'>
                            <Image
                                src={ProfilePhoto4}
                                width={150}
                                height={150}
                                alt='Emily Davis'
                                className='rounded-full'
                            />
                            <div className='text-center'>
                                <h3 className='text-lg font-bold'>Emily Davis</h3>
                                <p className='text-muted-foreground'>Product Manager</p>
                                <p className='text-sm text-muted-foreground'>
                                    Emily is a skilled product manager with a deep understanding of
                                    user needs and a passion for creating intuitive and
                                    user-friendly software.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

function CheckIcon(props) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='M20 6 9 17l-5-5' />
        </svg>
    );
}

function XIcon(props) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='M18 6 6 18' />
            <path d='m6 6 12 12' />
        </svg>
    );
}

export default AboutPage;
