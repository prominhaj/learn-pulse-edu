
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroupItem } from "@/components/ui/radio-group";

export const QuizOption = ({ form, name, isSubmitting, value, onChange }) => (
    <div className="space-y-3">
        <FormLabel>{`Option ${name.charAt(name.length - 1).toUpperCase()}`}</FormLabel>
        <div className="flex items-start gap-3">
            <FormItem className="flex flex-row items-start p-1.5 space-y-0 border rounded-md">
                <FormControl>
                    <RadioGroupItem
                        className="w-5 h-5"
                        value={name}
                        checked={value === name}
                        onChange={() => onChange(name)}
                    />
                </FormControl>
            </FormItem>
            <div className="flex-1">
                <FormField
                    control={form.control}
                    name={`${name}.text`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    disabled={isSubmitting}
                                    placeholder={`Enter option ${name.charAt(name.length - 1).toUpperCase()} text`}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    </div>
);