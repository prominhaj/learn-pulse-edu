"use client";
import { changeUserPassword } from "@/app/actions/user";
import FormControl from "../FormControl/FormControl";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { toast } from "sonner";
import { useState } from "react";

const ChangePassword = ({ userId }) => {
    const [error, setError] = useState(null);

    const handleChangePassword = async (formData) => {
        setError(null);
        try {
            const result = await changeUserPassword(formData, userId);
            if (result?.error) {
                toast.error(result.message);
            }
            else if (result.errors) {
                setError(result.errors)
            }
            else if (result.success) {
                toast.success(result.message);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div>
            <h5 className='mb-4 text-lg font-semibold'>Change Password</h5>
            <form action={handleChangePassword}>
                <div className='grid grid-cols-1 gap-5'>
                    <FormControl label="Old password" type="password" required={true} placeholder="Old password" name="oldPassword" />
                    <div>
                        <FormControl label="New password" type="password" required={true} placeholder="New password" name="newPassword" error={error?.password} />
                        {/* Password Error */}
                        {
                            error?.password && (
                                error?.password?.map((e, i) => (
                                    <p key={i} className="text-red-500">
                                        <small>
                                            {e}
                                        </small>
                                    </p>
                                ))
                            )
                        }
                    </div>
                    <div>
                        <FormControl label="Re-type New password" type="password" required={true} placeholder="Re-type New password" name="confirmPassword" error={error?.confirmPassword} />
                        {/* Password Error */}
                        {
                            error?.confirmPassword && (
                                error?.confirmPassword?.map((e, i) => (
                                    <p key={i} className="text-red-500">
                                        <small>
                                            {e}
                                        </small>
                                    </p>
                                ))
                            )
                        }
                    </div>
                </div>
                {/*end grid*/}
                <SubmitButton className='mt-5' type='submit'>
                    Save password
                </SubmitButton>
            </form>
        </div>
    );
};

export default ChangePassword;