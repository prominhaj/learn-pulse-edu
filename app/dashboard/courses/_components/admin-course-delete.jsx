"use client";

import { deleteCourse } from "@/app/actions/course";
import Spinner from "@/components/globals/Spinner/Spinner";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AdminCourseDelete = ({ id }) => {
    const [loading, setLoading] = useState(false);

    // handle Delete courses in admin
    const deleteCourseAction = async () => {
        setLoading(true);
        try {
            const result = await deleteCourse(id);
            if (result?.success) {
                toast.success("Course deleted successfully!");
            }
            else {
                toast.error("Failed to delete course");
            }
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={deleteCourseAction}
            disabled={loading}
            type="button"
            className="flex items-center gap-1.5 text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {
                loading ? (
                    <>
                        <Spinner /> Loading...
                    </>
                ) : (
                    <>
                        <Trash className="w-4 h-4" /> Delete
                    </>
                )
            }
        </button>
    );
};

export default AdminCourseDelete;