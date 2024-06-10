import { cn } from "@/lib/utils";
const { Input } = require("@/components/ui/input");
const { Label } = require("@/components/ui/label");

const FormControl = ({ id, name, label, type = 'text', placeholder, errors }) => (
    <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
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