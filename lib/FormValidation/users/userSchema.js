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

export const userSchemaStep2 = z.object({
    profilePicture: z
        .instanceof(File)
        .refine((file) => file && file.size <= 5 * 1024 * 1024, {
            message: 'Photo must be less than 5MB'
        })
        .refine((file) => !!file, { message: 'Photo is required' })
        .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image' }),
    phone: z.string().regex(/^\d{10}$/, { message: 'Phone number must be 10 digits' }),
    designation: z.string().min(5, { message: 'Designation must be at least 5 characters long' }),
    bio: z.string().min(10, { message: 'Bio must be at least 10 characters long' })
});

const socialMediaUrlPatterns = {
    facebook: /^https?:\/\/(www\.)?facebook.com\/[A-Za-z0-9_.-]+$/,
    twitter: /^https?:\/\/(www\.)?x.com\/[A-Za-z0-9_]+$/,
    instagram: /^https?:\/\/(www\.)?instagram.com\/[A-Za-z0-9_.-]+$/,
    linkedin: /^https?:\/\/(www\.)?linkedin.com\/in\/[A-Za-z0-9_-]+$/
};

// Define the schema for social media URLs
export const socialMediaSchema = z.object({
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
