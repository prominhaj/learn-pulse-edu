import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const LearningAddForm = ({ handler, error, defaultValue }) => {
    return (
        <form action={handler} className="flex items-start gap-2 mt-4">
            <div className="w-full">
                <Input defaultValue={defaultValue || ""} className={cn(error && "border-red-500")} name="learning" type="text" placeholder="Add course learning" />
                {
                    error &&
                    <p className="text-red-500"><small>{error}</small></p>
                }
            </div>
            <SubmitButton>
                Save
            </SubmitButton>
        </form>
    );
};

export default LearningAddForm;