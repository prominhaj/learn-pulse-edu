import { getUserData } from '@/lib/getUserData';
import ContactForm from './_component/ContactForm';
import { cookies } from 'next/headers';

const ContactPage = async () => {
    cookies();
    const user = await getUserData();

    return (
        <>
            <div className='w-full max-w-5xl px-4 py-12 mx-auto md:py-20 md:px-6'>
                <div className='grid gap-12 md:grid-cols-2'>
                    <div>
                        <h1 className='mb-4 text-3xl font-bold'>Contact Me</h1>
                        <p className='mb-8 text-muted-foreground'>
                            Have a question or want to work together? Fill out the form below and
                            well get back to you as soon as possible.
                        </p>
                        <ContactForm user={user} />
                    </div>
                    <div className='p-8 rounded-lg bg-muted'>
                        <h2 className='mb-4 text-2xl font-bold'>Contact Information</h2>
                        <div className='space-y-4'>
                            <div>
                                <h3 className='text-lg font-medium'>Address</h3>
                                <p className='text-muted-foreground'>
                                    Bogura, Rajshahi, Bangladesh
                                </p>
                            </div>
                            <div>
                                <h3 className='text-lg font-medium'>Phone</h3>
                                <p className='text-muted-foreground'>+8801770322532</p>
                            </div>
                            <div>
                                <h3 className='text-lg font-medium'>Email</h3>
                                <p className='text-muted-foreground'>parsonal322532@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;
