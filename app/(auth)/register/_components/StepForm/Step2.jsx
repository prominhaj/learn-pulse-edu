import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import FormControl from "../FormControl";
import Bio from "../Bio";

const Step2 = ({ formAction, state }) => {
    return (
        <form action={formAction} className="grid gap-4">
            <FormControl id="photo" name="profilePicture" label="Profile Photo" type="file" errors={state?.profilePicture} />
            <FormControl id="phone-number" name="phone" label="Phone" placeholder="+880" type="number" errors={state?.phone} />
            <FormControl id="designation" name="designation" label="Designation" placeholder="Senior Software Engineer" errors={state?.designation} />
            <Bio errors={state?.bio} />
            <SubmitButton className="w-full">Next</SubmitButton>
        </form>
    );
};

export default Step2;