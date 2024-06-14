"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImageDown, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ChangeProfilePhoto = () => {
    const [image, setImage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    }

    const handleSubmit = async () => {
        // const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        // onSubmit(croppedImage);
        // onClose();
    };

    return (
        <>
            <input
                id='pro-img'
                name='profile-image'
                type='file'
                accept="image/*"
                className='hidden'
                onChange={handleFileChange}
            />
            <Dialog className="bg-background" open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Profile Photo</DialogTitle>
                    </DialogHeader>
                    <div className="pt-3">
                        {
                            image ? (
                                <div>
                                    <div className="flex items-center justify-end">
                                        <button onClick={() => setImage(null)}>
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="relative mx-auto size-28">
                                        <Image className="object-cover w-full h-full rounded-full" src={URL.createObjectURL(image)} width={100} height={100} alt="Profile Photo" />
                                    </div>
                                    <div className="flex items-center justify-center gap-3 pt-5">
                                        <DialogClose>
                                            <Button variant="secondary">
                                                Close
                                            </Button>
                                        </DialogClose>
                                        <Button type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            ) : <>
                                <input
                                    id='edit-profile-photo'
                                    name='profile-image'
                                    type='file'
                                    accept="image/*"
                                    className='hidden'
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="edit-profile-photo">
                                    <ImageDown className="relative mx-auto size-28" />
                                </label>
                            </>
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ChangeProfilePhoto;