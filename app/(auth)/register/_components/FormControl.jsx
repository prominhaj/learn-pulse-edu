import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormControl = ({ id, name, label, type = 'text', placeholder, errors, social, socialClass }) => (
    <div className="grid gap-2">
        <Label className={cn(socialClass && socialClass)} htmlFor={id}>{label} {social && social}</Label>
        <div>
            <Input className={cn(errors && 'border-red-500')} name={name} id={id} type={type} placeholder={placeholder} />
            {errors && errors.map((error, index) => (
                <p className="text-red-500" key={index}>
                    <small>{error}</small>
                </p>
            ))}
        </div>
    </div>
);

export default FormControl;