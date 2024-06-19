"use client";
import { addNewLearning, deleteLearning, updateLearning } from "@/app/actions/course";
import { Button } from "@/components/ui/button";
import { Delete, Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import LearningAddForm from "./LearningAddForm";

export const LearningForm = ({ initialData, courseId }) => {
    const [learnings, setLearnings] = useState(initialData);
    const [oldLearning, setOldLearning] = useState(null);
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

    // Handle Edit Learning
    const editLearningMode = (index) => {
        setOldLearning(learnings[index])
        toggleEdit()
    }

    const handleEditLearning = async (formData) => {
        setError(null)
        try {
            const newLearning = formData.get("learning");

            // validate Form
            if (!newLearning) {
                setError("Please Enter Learning")
                return;
            }

            const updatedLearning = await updateLearning(newLearning, oldLearning, courseId);
            setLearnings(updatedLearning)
            router.refresh()
            toggleEdit()
            toast.success("Learning updated successfully")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    // Delete Learning
    const handleDeleteLearning = async (learning) => {
        try {
            const updatedLearning = await deleteLearning(learning, courseId);
            setLearnings(updatedLearning)
            router.refresh()
            toast.success("Learning deleted successfully")
        } catch (error) {
            toast.error("Something went wrong")
        }
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
                    learnings.length > 0 ? learnings?.map((learning, index) => (
                        <div key={index} className="flex items-center justify-between gap-3 space-y-2">
                            <li className="list-disc">
                                {learning}
                            </li>
                            <div className="flex items-center gap-2">
                                <button onClick={() => editLearningMode(index)}>
                                    <Pencil className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleDeleteLearning(learning)}>
                                    <Delete className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )) : <p className="italic text-center text-muted-foreground">No learning please add</p>
                }
                {isEditing && (
                    <LearningAddForm handler={handleEditLearning} error={error} defaultValue={oldLearning} />
                )}
                {isAdd && (
                    <LearningAddForm handler={handleAddLearning} error={error} />
                )}
            </div>
        </div>
    );
};
