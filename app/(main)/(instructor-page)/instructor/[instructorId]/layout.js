import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInstructorDetails } from '@/queries/instructor';
import Menu from '../../_components/Menu';
import SocialMedia from '../../_components/SocialMedia';

const InstructorLayout = async ({ params: { instructorId }, children }) => {
    const instructorDetails = await getInstructorDetails(instructorId);

    const menu = [
        { label: 'Courses', href: `/instructor/${instructorId}/courses` },
        { label: 'Students', href: `/instructor/${instructorId}/students` }
    ];

    return (
        <div className='container relative py-8 md:py-10'>
            <div className='lg:flex'>
                <div className='lg:w-1/4 md:px-3'>
                    <div className='relative'>
                        <div className='p-5 transition-all duration-500 ease-in-out border rounded-md bg-background'>
                            <div className='mb-5 text-center'>
                                <div>
                                    <div className='relative mx-auto cursor-pointer group size-28'>
                                        <Avatar className='w-full h-full shadow dark:shadow-gray-800 bg-slate-300 text-white ring-4 ring-violet-600 focus:outline-none focus:ring-4 dark:bg-gray-700 dark:ring-[#00d991]'>
                                            <AvatarImage
                                                className='object-cover'
                                                src={instructorDetails?.profilePicture?.url}
                                                alt='profile-image'
                                            />
                                            <AvatarFallback>
                                                {instructorDetails?.firstName.slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className='mt-4'>
                                        <h5 className='text-lg font-semibold'>
                                            {`${instructorDetails?.firstName} ${instructorDetails?.lastName}`}
                                        </h5>
                                        <p className='text-[14px] text-gray-700 dark:text-gray-300 font-poppins'>
                                            {instructorDetails?.designation}
                                        </p>
                                        <p className='text-sm text-muted-foreground'>
                                            {instructorDetails?.email}
                                        </p>
                                    </div>
                                    <SocialMedia links={instructorDetails?.socialMedia} />
                                </div>
                            </div>
                            <div className='border-t border-gray-100 dark:border-gray-700'>
                                <Menu menu={menu} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lg:w-3/4 md:px-3 mt-[30px] lg:mt-0'>{children}</div>
            </div>
        </div>
    );
};

export default InstructorLayout;
