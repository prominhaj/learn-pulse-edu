import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import FormControl from "../FormControl";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Step3 = ({ formAction, state }) => {

    // Social Media Items
    const socialMediaItems = [
        {
            name: "twitter",
            label: "Twitter",
            icon: <Twitter className="w-4 h-4" />,
            placeholder: "https://twitter.com",
            errors: state?.twitter
        },
        {
            name: "facebook",
            label: "Facebook",
            icon: <Facebook className="w-4 h-4" />,
            placeholder: "https://facebook.com",
            errors: state?.facebook
        },
        {
            name: "linkedin",
            label: "Linkedin",
            icon: <Linkedin className="w-4 h-4" />,
            placeholder: "https://linkedin.com",
            errors: state?.linkedin
        },
        {
            name: "instagram",
            label: "Instagram",
            icon: <Instagram className="w-4 h-4" />,
            placeholder: "https://instagram.com",
            errors: state?.instagram
        },
    ]

    return (
        <form action={formAction} className="grid gap-4">
            {
                socialMediaItems.map((item, index) => <FormControl key={index} id={item.name} name={item.name} label={item.label} type="url" placeholder={item.placeholder} errors={item.errors} social={item.icon} socialClass="flex items-center gap-2" />)
            }
            <SubmitButton className="w-full">Create New Account</SubmitButton>
        </form>
    );
};

export default Step3;