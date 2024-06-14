import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PersonalDetails from './_components/PersonalDetails/PersonalDetails';
import { getServerSession } from 'next-auth';
import { getUserByEmail } from '@/queries/users';

const Profile = async () => {
    const { user } = await getServerSession();
    const loginUser = await getUserByEmail(user.email);

    return (
        <>
            <PersonalDetails user={loginUser} />
            <div className='p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-[30px]'>
                <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
                    <div>
                        <h5 className='mb-4 text-lg font-semibold'>Contact Info :</h5>
                        <form>
                            <div className='grid grid-cols-1 gap-5'>
                                <div>
                                    <Label className='block mb-2'>Phone No. :</Label>
                                    <Input
                                        name='number'
                                        id='number'
                                        type='number'
                                        placeholder='Phone :'
                                    />
                                </div>
                                <div>
                                    <Label className='block mb-2'>Website :</Label>
                                    <Input name='url' id='url' type='url' placeholder='Url :' />
                                </div>
                            </div>
                            {/*end grid*/}
                            <Button className='mt-5' type='submit'>
                                Add
                            </Button>
                        </form>
                    </div>
                    {/*end col*/}
                    <div>
                        <h5 className='mb-4 text-lg font-semibold'>Change password :</h5>
                        <form>
                            <div className='grid grid-cols-1 gap-5'>
                                <div>
                                    <Label className='block mb-2'>Old password :</Label>
                                    <Input type='password' placeholder='Old password' required='' />
                                </div>
                                <div>
                                    <Label className='block mb-2'>New password :</Label>
                                    <Input type='password' placeholder='New password' required='' />
                                </div>
                                <div>
                                    <Label className='block mb-2'>Re-type New password :</Label>
                                    <Input
                                        type='password'
                                        placeholder='Re-type New password'
                                        required=''
                                    />
                                </div>
                            </div>
                            {/*end grid*/}
                            <Button className='mt-5' type='submit'>
                                Save password
                            </Button>
                        </form>
                    </div>
                    {/*end col*/}
                </div>
                {/*end row*/}
            </div>
        </>
    );
};

export default Profile;
