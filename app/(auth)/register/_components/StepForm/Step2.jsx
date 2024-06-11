import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import FormControl from "../FormControl";
import Bio from "../Bio";

const Step2 = ({ formAction, state }) => {
    console.log(state);
    return (
        <form action={formAction} className="grid gap-4">
            <FormControl id="photo" name="photo" label="Profile Photo" type="file" errors={state?.photo} />
            <FormControl id="phone-number" name="phone" label="Phone" placeholder="+880" type="number" errors={state?.phone} />
            <FormControl id="designation" name="designation" label="Designation" errors={state?.designation} />
            <Bio errors={state?.bio} />
            <SubmitButton className="w-full">Create an account</SubmitButton>
        </form>
    );
};

export default Step2;