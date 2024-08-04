import { DataTable } from "@/app/dashboard/courses/_components/data-table";
import { getAdminInstructors } from "@/queries/admin";
import { columns } from "./columns";
import { getCourseDetailsByInstructor } from "@/queries/courses";

const ActiveInstructor = async () => {
    const activeInstructors = await getAdminInstructors("Teacher");

    const modifiedInstructors = await Promise.all(activeInstructors.map(async instructor => {
        const { courses, enrollments, ratings } = await getCourseDetailsByInstructor(instructor?.id);

        return {
            id: instructor.id,
            role: instructor.role,
            image: instructor?.profilePicture?.url,
            name: instructor?.firstName + " " + instructor?.lastName,
            email: instructor.email,
            status: "Active",
            courses,
            enrollments,
            ratings
        }
    }))

    return (
        <div>
            <DataTable columns={columns} data={modifiedInstructors} />
        </div>
    );
};

export default ActiveInstructor;