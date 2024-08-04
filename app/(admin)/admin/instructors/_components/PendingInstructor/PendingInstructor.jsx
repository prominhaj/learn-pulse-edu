import { DataTable } from "@/app/dashboard/courses/_components/data-table";
import { getAdminInstructors } from "@/queries/admin";
import { columns } from "./columns";

const PendingInstructor = async () => {
    const pendingInstructors = await getAdminInstructors("Pending");
    const modifiedPendingInstructors = pendingInstructors.map(instructor => {
        return {
            id: instructor.id,
            role: instructor.role,
            image: instructor?.profilePicture?.url,
            name: instructor?.firstName + " " + instructor?.lastName,
            email: instructor.email,
            status: "Pending",
        }
    });

    return (
        <div>
            <DataTable columns={columns} data={modifiedPendingInstructors} />
        </div>
    );
};

export default PendingInstructor;