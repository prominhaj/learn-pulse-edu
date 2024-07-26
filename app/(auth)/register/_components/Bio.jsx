import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const Bio = ({ errors, defaultValue }) => {
    return (
        <div className="grid">
            <Label className="mb-2" htmlFor="bio">Bio</Label>
            <Textarea
                className={cn(errors && "border-red-500")}
                name="bio"
                id="bio"
                placeholder="Type your bio here..."
                defaultValue={defaultValue || ""}
            />
            {errors && errors.map((error, index) => (
                <p className="text-red-500" key={index}>
                    <small>{error}</small>
                </p>
            ))}
        </div>
    );
};

export default Bio;