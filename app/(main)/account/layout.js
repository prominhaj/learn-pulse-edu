import Menu from './component/account-menu';
import { getServerSession } from 'next-auth';
import { getUserByEmail } from '@/queries/users';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChangeProfilePhoto from './component/ChangeProfilePhoto';
import { Camera } from 'lucide-react';

const AccountLayout = async ({ tabs }) => {
    const { user } = await getServerSession();
    const loginUser = await getUserByEmail(user?.email);

    return (
        <section className='relative pb-16'>
            <div className='container relative mt-10'>
                <div className='lg:flex'>
                    <div className='lg:w-1/4 md:px-3'>
                        <div className='relative'>
                            <div className='p-5 transition-all duration-500 ease-in-out border rounded-md bg-background'>
                                <div className='mb-5 text-center profile-pic'>
                                    <ChangeProfilePhoto user={loginUser} />
                                    <div>
                                        <div className='relative mx-auto cursor-pointer group size-28'>
                                            <div className='absolute top-0 bottom-0 left-0 right-0 hidden transition-all duration-500 ease-in-out bg-gray-300 bg-opacity-50 rounded-full dark:bg-opacity-50 dark:bg-gray-500 group-hover:block group-hover:z-10'>
                                                <div className='flex items-center justify-center w-full h-full'>
                                                    <Camera className='w-6 h-6' />
                                                </div>
                                            </div>
                                            <Avatar className='w-full h-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800'>
                                                <AvatarImage
                                                    src={loginUser?.profilePicture?.url}
                                                    alt='profile-image'
                                                />
                                                <AvatarFallback>
                                                    {loginUser?.firstName.slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <label
                                                className='absolute inset-0 z-30 cursor-pointer'
                                                htmlFor='pro-img'
                                            />
                                        </div>
                                        <div className='mt-4'>
                                            <h5 className='text-lg font-semibold'>{`${loginUser?.firstName} ${loginUser?.lastName}`}</h5>
                                            <p className='text-sm text-muted-foreground'>
                                                {loginUser?.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='border-t border-gray-100 dark:border-gray-700'>
                                    <Menu />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Tabs */}
                    <div className='lg:w-3/4 md:px-3 mt-[30px] lg:mt-0'>{tabs}</div>
                </div>
            </div>
        </section>
    );
};

export default AccountLayout;
