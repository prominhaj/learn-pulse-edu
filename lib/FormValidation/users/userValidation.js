import { userSchema, userSchemaStep2 } from '@/lib/FormValidation/users/userSchema';

export const userValidation = async (formData) => {
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
    return validatedFields;
};

export const userValidationStep2 = async (formData) => {
    // Validate the form
    const validatedFields = userSchemaStep2.safeParse({
        photo: formData.get('photo'),
        phone: formData.get('phone'),
        designation: formData.get('designation'),
        bio: formData.get('bio')
    });
    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }
    return validatedFields;
};
