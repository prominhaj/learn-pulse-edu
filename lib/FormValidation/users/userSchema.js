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
    photo: z
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
