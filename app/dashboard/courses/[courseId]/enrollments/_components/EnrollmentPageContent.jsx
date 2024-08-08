import { getCourseByCourseId } from "@/queries/courses";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getEnrollmentsForCourse } from "@/queries/enrollments";
import { populateEnrollmentData } from "@/lib/dashboard-helper";


const EnrollmentPageContent = async ({ courseId }) => {
    const course = await getCourseByCourseId(courseId);
    const enrollments = await getEnrollmentsForCourse(courseId);
    const enrollmentsData = await populateEnrollmentData(enrollments);

    return (
        <div className='p-6'>
            <h2>{course?.title}</h2>
            <DataTable columns={columns} data={enrollmentsData} />
        </div>
    );
};

export default EnrollmentPageContent;