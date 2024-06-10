'use server';
import { userSchema } from '@/lib/FormValidation/userSchema';

export const createAccount = async (_currentState, formData) => {
    // Validate the form
    const validatedFields = userSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }
};
