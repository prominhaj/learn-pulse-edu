"use client";
import Bio from "@/app/(auth)/register/_components/Bio";
import FormControl from "@/app/(auth)/register/_components/FormControl";
import { updateUserPersonalDetails } from "@/app/actions/user";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { userInfoValidation } from "@/lib/FormValidation/users/userValidation";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ApplyInstructorForm = ({ user }) => {
    const [state, setState] = useState({});

    const socialMediaItems = [
        {
            name: "twitter",
            label: "Twitter",
            icon: <Twitter className="w-4 h-4" />,
            defaultValue: user?.socialMedia?.twitter,
            placeholder: "https://twitter.com",
            errors: state?.twitter
        },
        {
            name: "facebook",
            label: "Facebook",
            icon: <Facebook className="w-4 h-4" />,
            defaultValue: user?.socialMedia?.facebook,
            placeholder: "https://facebook.com",
            errors: state?.facebook
        },
        {
            name: "linkedin",
            label: "Linkedin",
            icon: <Linkedin className="w-4 h-4" />,
            defaultValue: user?.socialMedia?.linkedin,
            placeholder: "https://linkedin.com",
            errors: state?.linkedin
        },
        {
            name: "instagram",
            label: "Instagram",
            icon: <Instagram className="w-4 h-4" />,
            defaultValue: user?.socialMedia?.instagram,
            placeholder: "https://instagram.com",
            errors: state?.instagram
        },
    ]

    const applyInstructorAction = async (formData) => {
        setState({});
        try {
            const userInfo = await userInfoValidation(formData);
            if (userInfo.errors) {
                setState(userInfo.errors);
                return;
            }
            else if (userInfo.success) {
                const newData = {
                    ...userInfo?.data,
                    role: "Pending"
                }

                const applyInstructor = await updateUserPersonalDetails(newData, user?.id);
                if (applyInstructor?.success) {
                    toast.success("Application submitted successfully")
                    return true
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form action={applyInstructorAction} className="grid gap-5 md:grid-cols-2">
            <div className="space-y-3">
                <FormControl
                    id="phone-number"
                    name="phone"
                    label="Phone"
                    placeholder="+880"
                    type="number"
                    errors={state?.phone}
                    defaultValue={user?.phone}
                />
                <FormControl
                    id="designation"
                    name="designation"
                    label="Designation"
                    placeholder="Senior Software Engineer"
                    errors={state?.designation}
                    defaultValue={user?.designation}
                />
                <Bio
                    errors={state?.bio}
                    defaultValue={user?.bio}
                />
            </div>
            <div className="space-y-3">
                {
                    socialMediaItems.map((item, index) => (
                        <FormControl
                            key={index}
                            id={item.name}
                            name={item.name}
                            label={item.label}
                            type="url"
                            placeholder={item.placeholder}
                            errors={item.errors}
                            social={item.icon}
                            socialClass="flex items-center gap-2"
                            defaultValue={item?.defaultValue}
                        />
                    ))
                }
                {
                    state?.socialMedia && (
                        <p className="flex flex-col text-red-500">
                            {state?.socialMedia?.map((error, index) => (
                                <small key={index}>{error}</small>
                            ))}
                        </p>
                    )
                }
            </div>
            <SubmitButton variant="primary" className="w-full md:col-span-2">Apply Instructor</SubmitButton>
        </form>
    );
};

export default ApplyInstructorForm;