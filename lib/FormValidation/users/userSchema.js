import { z } from 'zod';

export const userSchema = z
    .object({
        firstName: z.string().min(1, { message: 'First name is required' }),
        lastName: z.string().min(1, { message: 'Last name is required' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
                message:
                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            }),
        confirmPassword: z.string().min(1, { message: 'Confirm password is required' })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    });

const socialMediaUrlPatterns = {
    facebook: /^https?:\/\/(www\.)?facebook\.com\/.+$/i,
    twitter: /^https?:\/\/(www\.)?x\.com\/.+$/i,
    instagram: /^https?:\/\/(www\.)?instagram\.com\/.+$/i,
    linkedin: /^https?:\/\/(www\.)?linkedin\.com\/.+$/i
};

const socialMediaSchema = z.object({
    facebook: z
        .string()
        .url()
        .regex(socialMediaUrlPatterns.facebook, { message: 'Invalid Facebook URL' })
        .optional(),
    twitter: z
        .string()
        .url()
        .regex(socialMediaUrlPatterns.twitter, { message: 'Invalid Twitter URL' })
        .optional(),
    instagram: z
        .string()
        .url()
        .regex(socialMediaUrlPatterns.instagram, { message: 'Invalid Instagram URL' })
        .optional(),
    linkedin: z
        .string()
        .url()
        .regex(socialMediaUrlPatterns.linkedin, { message: 'Invalid LinkedIn URL' })
        .optional()
});

export const userInfoSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, { message: 'Phone number must be 10 digits' }),
    designation: z.string().min(5, { message: 'Designation must be at least 5 characters long' }),
    bio: z.string().min(10, { message: 'Bio must be at least 10 characters long' }),
    socialMedia: socialMediaSchema.optional()
});

// Password Validations
export const passwordValidations = z
    .object({
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
                message:
                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            }),
        confirmPassword: z.string().min(1, { message: 'Re-type password is required' })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'New Password and Retype Password does not match',
        path: ['confirmPassword']
    });
