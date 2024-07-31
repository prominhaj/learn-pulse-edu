import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import FormControl from "../FormControl";

const RegisterFrom = ({ formAction, state }) => {
    return (
        <>
            <form action={formAction} className="grid gap-4">
                <div className="grid items-start grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormControl id="first-name" name="firstName" label="First name" placeholder="Jon" errors={state?.firstName} />
                    <FormControl id="last-name" name="lastName" label="Last name" placeholder="Robinson" errors={state?.lastName} />
                </div>
                <FormControl id="email" name="email" label="Email" type="email" placeholder="m@example.com" errors={state?.email} />
                <FormControl id="password" name="password" label="Password" type="password" placeholder="••••••••" errors={state?.password} />
                <FormControl id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password" placeholder="••••••••" errors={state?.confirmPassword} />
                <SubmitButton className="w-full">Create New Account</SubmitButton>
            </form>
        </>
    );
};

export default RegisterFrom;