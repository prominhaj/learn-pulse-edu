"use client";
import { useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SubmitButton from '@/components/globals/SubmitButton/SubmitButton';
import { contactEmailSent } from '@/app/actions/contact';
import { toast } from 'sonner';

const ContactForm = ({ user }) => {
    const name = user?.firstName + ' ' + user?.lastName;

    const formRef = useRef(null);

    const submitContactAction = async (formData) => {
        try {
            const sentEmail = await contactEmailSent(formData);
            if (sentEmail?.data?.id) {
                toast.success('Contact Form Submit Successful');
                formRef.current.reset();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <form ref={formRef} action={submitContactAction} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                        defaultValue={name || ''}
                        id='name'
                        type='text'
                        name='name'
                        placeholder='Enter your name'
                    />
                </div>
                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        defaultValue={user?.email || ''}
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                    />
                </div>
                <div className='col-span-2'>
                    <Label htmlFor='subject'>Subject</Label>
                    <Input
                        id='subject'
                        type='text'
                        name='subject'
                        placeholder='Enter your subject'
                    />
                </div>
            </div>
            <div>
                <Label htmlFor='message'>Message</Label>
                <Textarea
                    name='message'
                    id='message'
                    placeholder='Enter your message'
                    className='min-h-[150px]'
                />
            </div>
            <SubmitButton className='w-full'>Submit</SubmitButton>
        </form>
    );
};

export default ContactForm;
