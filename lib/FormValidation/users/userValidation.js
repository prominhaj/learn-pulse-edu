import { userInfoSchema, userSchema } from '@/lib/FormValidation/users/userSchema';

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

export const userInfoValidation = async (formData) => {
    // Validate the form
    const validatedFields = userInfoSchema.safeParse({
        phone: formData.get('phone'),
        designation: formData.get('designation'),
        bio: formData.get('bio'),
        socialMedia: {
            facebook: formData.get('facebook'),
            twitter: formData.get('twitter'),
            instagram: formData.get('instagram'),
            linkedin: formData.get('linkedin')
        }
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }
    return validatedFields;
};
