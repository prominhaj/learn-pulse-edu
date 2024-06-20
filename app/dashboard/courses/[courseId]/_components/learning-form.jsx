"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Delete, Pencil, Plus } from "lucide-react";
import { addNewLearning, deleteLearning, updateLearning } from "@/app/actions/course";
import LearningAddForm from "./LearningAddForm";

export const LearningForm = ({ initialData, courseId }) => {
    const [learnings, setLearnings] = useState(initialData);
    const [oldLearning, setOldLearning] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    const toggleEdit = useCallback(() => setIsEditing((prev) => !prev), []);
    const toggleAdd = useCallback(() => setIsAdd((prev) => !prev), []);

    const handleAddLearning = useCallback(async (formData) => {
        setError(null);
        try {
            const newLearning = formData.get("learning");

            if (!newLearning) {
                setError("Please enter learning");
                return;
            }

            await addNewLearning(newLearning, courseId);
            setLearnings((prevLearnings) => [...prevLearnings, newLearning]);
            router.refresh();
            toast.success("New learning added successfully");
            toggleAdd();
        } catch (error) {
            toast.error("Failed to add new learning");
        }
    }, [courseId, router, toggleAdd]);

    const editLearningMode = useCallback((index) => {
        setOldLearning(learnings[index]);
        toggleEdit();
    }, [learnings, toggleEdit]);

    const handleEditLearning = useCallback(async (formData) => {
        setError(null);
        try {
            const newLearning = formData.get("learning");

            if (!newLearning) {
                setError("Please enter learning");
                return;
            }

            const updatedLearning = await updateLearning(newLearning, oldLearning, courseId);
            setLearnings((prevLearnings) =>
                prevLearnings.map((learning, index) => (index === learnings.indexOf(oldLearning) ? updatedLearning : learning))
            );
            router.refresh();
            toggleEdit();
            toast.success("Learning updated successfully");
        } catch (error) {
            toast.error("Failed to update learning");
        }
    }, [courseId, oldLearning, learnings, router, toggleEdit]);

    const handleDeleteLearning = useCallback(async (learning) => {
        try {
            await deleteLearning(learning, courseId);
            setLearnings((prevLearnings) => prevLearnings.filter((item) => item !== learning));
            router.refresh();
            toast.success("Learning deleted successfully");
        } catch (error) {
            toast.error("Failed to delete learning");
        }
    }, [courseId, router]);

    return (
        <div className="p-4 mt-6 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2 text-base font-medium">
                Course Learning
                {isAdd ? (
                    <Button size="sm" variant="secondary" className="px-2.5 font-medium py-1" onClick={toggleAdd}>
                        Cancel
                    </Button>
                ) : (
                    <Button onClick={toggleAdd} className="flex items-center gap-1.5 px-2.5 font-medium py-1" size="sm" variant="secondary">
                        <Plus className="w-5 h-5" />
                        Add
                    </Button>
                )}
            </div>
            <div>
                {learnings.length > 0 ? (
                    learnings.map((learning, index) => (
                        <div key={index} className="flex items-center justify-between gap-3 space-y-2">
                            <li className="list-disc">{learning}</li>
                            <div className="flex items-center gap-2">
                                <button onClick={() => editLearningMode(index)}>
                                    <Pencil className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleDeleteLearning(learning)}>
                                    <Delete className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="italic text-center text-muted-foreground">No learning, please add</p>
                )}
                {isEditing && <LearningAddForm handler={handleEditLearning} error={error} defaultValue={oldLearning} />}
                {isAdd && <LearningAddForm handler={handleAddLearning} error={error} />}
            </div>
        </div>
    );
};
