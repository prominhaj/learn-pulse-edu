"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FormControl from "../FormControl/FormControl";
import { updateUserPersonalDetails } from "@/app/actions/user";
import { toast } from "sonner";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";

const PersonalDetails = ({ user }) => {

    const formSubmit = async (formData) => {
        const updateUserInfo = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: user.email,
            designation: formData.get('designation'),
            bio: formData.get('bio')
        }

        try {
            const updatedUser = await updateUserPersonalDetails(updateUserInfo, user?.id);
            if (updatedUser.success) {
                toast.success(updatedUser.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='p-5 transition-all duration-500 ease-in-out border rounded-md bg-background'>
            <h5 className='mb-4 text-lg font-semibold'>Personal Detail</h5>
            <form action={formSubmit}>
                <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
                    <FormControl label="First Name" required={true} placeholder="First Name" name="firstName" defaultValue={user?.firstName} />
                    <FormControl label="Last Name" required={true} placeholder="Last Name" name="lastName" defaultValue={user?.lastName} />
                    <FormControl label="Email" required={true} placeholder="Email" name="email" type="email" disabled={true} defaultValue={user?.email} />
                    <FormControl label="Designation" placeholder="Designation" name="designation" defaultValue={user?.designation} />
                </div>
                {/*end grid*/}
                <div className='grid grid-cols-1'>
                    <div className='mt-5'>
                        <Label className='block mb-2'>Bio</Label>
                        <Textarea className="h-14" id='bio' name='bio' placeholder='Message...' defaultValue={user?.bio} />
                    </div>
                </div>
                {/*end row*/}
                <SubmitButton className="mt-5">
                    Save Changes
                </SubmitButton>
            </form>
            {/*end form*/}
        </div>
    );
};

export default PersonalDetails;