"use client";
import { Button } from "@/components/ui/button";
import { Delete, Pencil, Plus } from "lucide-react";
import { useState } from "react";

export const LearningForm = ({ initialData }) => {
    const [learnings, setLearnings] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    return (
        <div className="p-4 mt-6 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2 text-base font-medium">
                Course Learning
                <Button className="flex items-center gap-1.5 px-2.5 font-medium py-1" size="sm">
                    <Plus className="w-4 h-4" />
                    Add
                </Button>
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
            </div>
        </div>
    );
};
