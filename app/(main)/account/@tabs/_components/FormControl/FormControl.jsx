import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormControl = ({ label, name, placeholder, type = "text", required, defaultValue, disabled }) => {
    return (
        <div>
            <Label htmlFor={name} className='block mb-2'>
                {label} {required && <span className='text-red-600'>*</span>}
            </Label>
            <Input
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