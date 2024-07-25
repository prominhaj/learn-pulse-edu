'use server';

import ContactEmailTemplate from '@/components/globals/EmailTemplate/ContactEmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const contactEmailSent = async (formData) => {
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const userMessage = formData.get('message');

    try {
        const sentInfo = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: 'parsonal322532@gmail.com',
            subject: subject,
            react: ContactEmailTemplate({ name, email, subject, userMessage })
        });

        return sentInfo;
    } catch (error) {
        throw new Error(error);
    }
};
