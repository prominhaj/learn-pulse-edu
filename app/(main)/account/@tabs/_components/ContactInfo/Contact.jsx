"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormControl from "../FormControl/FormControl";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";

const socialMediaPatterns = {
    facebook: /^https:\/\/www\.facebook\.com\/.+$/,
    twitter: /^https:\/\/(www\.)?x\.com\/.+$/,
    instagram: /^https:\/\/(www\.)?instagram\.com\/.+$/,
    linkedin: /^https:\/\/(www\.)?linkedin\.com\/.+$/,
    youtube: /^https:\/\/(www\.)?youtube\.com\/.+$/,
    tiktok: /^https:\/\/(www\.)?tiktok\.com\/.+$/,
    snapchat: /^https:\/\/(www\.)?snapchat\.com\/.+$/,
};

const socialMediaPlatforms = Object.keys(socialMediaPatterns);

const Contact = ({ socialMediaData, phone }) => {
    const [fields, setFields] = useState([]);
    const [errors, setErrors] = useState({});
    const [selectingPlatform, setSelectingPlatform] = useState(false);

    useEffect(() => {
        const initialFields = Object.keys(socialMediaData || {}).map((key, index) => ({
            id: index + 1,
            platform: key,
            value: socialMediaData[key],
        }));
        setFields(initialFields);
    }, [socialMediaData]);

    const addField = (platform) => {
        setErrors((errors) => ({ ...errors, platform: null }));
        if (fields.some(field => field.platform === platform)) {
            setErrors({ platform: `The ${platform} platform already exists.` });
            return;
        }
        setFields([...fields, { id: fields.length + 1, platform, value: "" }]);
        setSelectingPlatform(false);
    };

    const removeField = (id) => {
        setFields(fields.filter((field) => field.id !== id));
        setErrors((errors) => {
            const newErrors = { ...errors };
            delete newErrors[id];
            return newErrors;
        });
    };

    const handleChange = (id, key, value) => {
        setFields((fields) =>
            fields.map((field) => (field.id === id ? { ...field, [key]: value } : field))
        );
        setErrors((errors) => ({ ...errors, [id]: null }));
    };

    const validateField = (field) => {
        const pattern = socialMediaPatterns[field.platform];
        if (pattern && !pattern.test(field.value)) {
            return `Invalid ${field.platform} URL`;
        }
        return null;
    };

    const handleSubmit = (formData) => {
        const validationErrors = {};
        fields.forEach((field) => {
            const error = validateField(field);
            if (error) {
                validationErrors[field.id] = error;
            }
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const socialMedia = fields.reduce((acc, field) => {
                if (field.platform && field.value) {
                    acc[field.platform] = field.value;
                }
                return acc;
            }, {});
            const updateContactInfo = {
                phone: formData.get("phone"),
                socialMedia: { ...socialMediaData, ...socialMedia }
            };
            console.log(updateContactInfo);
        }
    };

    return (
        <div>
            <h5 className="mb-4 text-lg font-semibold">Contact Info</h5>
            <form action={handleSubmit}>
                <div className="grid grid-cols-1 gap-5">
                    <FormControl label="Phone No" name="phone" type="number" placeholder="+881*******" defaultValue={phone} />

                    {fields.map((field, index) => (
                        <div key={field.id}>
                            <Label htmlFor={field.value} className="block mb-2 capitalize">
                                {field.platform}
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="url"
                                    value={field.value}
                                    onChange={(e) => handleChange(field.id, "value", e.target.value)}
                                    placeholder={`${field.platform} url`}
                                    id={field.value}
                                />
                                <button type="button" onClick={() => removeField(field.id)} className="remove-button">
                                    <Trash2 />
                                </button>
                            </div>
                            {errors[field.id] && (
                                <p className="text-red-500">
                                    <small>
                                        {errors[field.id]}
                                    </small>
                                </p>
                            )}
                        </div>
                    ))}

                    {selectingPlatform && (
                        <Select onValueChange={addField} defaultValue="">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Platform" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Social Media</SelectLabel>
                                    {socialMediaPlatforms.map((platform) => (
                                        <SelectItem key={platform} value={platform}>
                                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                    {errors.platform && <p className="text-red-500"><small>{errors.platform}</small></p>}
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() => {
                            setErrors({});
                            setSelectingPlatform(true);
                        }}
                        className="add-button"
                    >
                        Add Social Media
                    </Button>
                </div>
                {/*end grid*/}
                <SubmitButton className="w-full mt-5" type="submit">
                    Save
                </SubmitButton>
            </form>
        </div>
    );
};

export default Contact;
