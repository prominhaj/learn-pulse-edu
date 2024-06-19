"use client";
import { addNewLearning } from "@/app/actions/course";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Delete, Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const LearningForm = ({ initialData, courseId }) => {
    const [learnings, setLearnings] = useState(initialData);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);
    const toggleAdd = () => setIsAdd((current) => !current);

    // Handle Add Learning 
    const handleAddLearning = async (formData) => {
        setError(null)
        try {
            const newLearning = formData.get("learning");

            // validate Form
            if (!newLearning) {
                setError("Please Enter Learning")
                return;
            }

            await addNewLearning(newLearning, courseId)
            setLearnings([...learnings, newLearning])
            router.refresh()
            toast.success("New learning added successfully")
        } catch (error) {
            toast.error("Something Went Wrong")
        }
        toggleAdd();
    }

    return (
        <div className="p-4 mt-6 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2 text-base font-medium">
                Course Learning
                {
                    isAdd ? (
                        <Button size="sm" variant="secondary" className="px-2.5 font-medium py-1" onClick={toggleAdd}>
                            Cancel
                        </Button>
                    ) : (
                        <Button onClick={toggleAdd} className="flex items-center gap-1.5 px-2.5 font-medium py-1" size="sm" variant="secondary">
                            <Plus className="w-5 h-5" />
                            Add
                        </Button>
                    )
                }
            </div>
            <div>
                {
                    learnings?.map((learning, index) => (
                        <div key={index} className="flex items-center justify-between gap-3 space-y-2">
                            <li className="list-disc">
                                {learning}
                            </li>
                            <div className="flex items-center gap-2">
                                <button onClick={toggleEdit}>
                                    <Pencil className="w-5 h-5" />
                                </button>
                                <button>
                                    <Delete className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    ))
                }
                {isAdd && (
                    <form action={handleAddLearning} className="flex items-start gap-2 mt-4">
                        <div className="w-full">
                            <Input className={cn(error && "border-red-500")} name="learning" type="text" placeholder="Add course learning" />
                            {
                                error &&
                                <p className="text-red-500"><small>{error}</small></p>
                            }
                        </div>
                        <SubmitButton>
                            Save
                        </SubmitButton>
                    </form>
                )}
            </div>
        </div>
    );
};
