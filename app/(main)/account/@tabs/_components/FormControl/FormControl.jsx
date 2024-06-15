import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FormControl = ({ label, name, placeholder, type = "text", required, defaultValue, disabled, error }) => {
    return (
        <div>
            <Label htmlFor={name} className='block mb-2'>
                {label} {required && <span className='text-red-600'>*</span>}
            </Label>
            <Input
                className={cn(error && "border-red-500")}
                type={type}
                placeholder={placeholder}
                id={name}
                name={name}
                defaultValue={defaultValue || ""}
                required={required}
                disabled={disabled}
            />
        </div>
    );
};

export default FormControl;