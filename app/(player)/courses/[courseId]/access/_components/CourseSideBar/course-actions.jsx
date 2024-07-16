import DownloadCertificate from "./DownloadCertificate";
import CourseRating from "./course-review";

const CourseActions = ({ courseProgress, courseId, userId }) => {

    return (
        <>
            <DownloadCertificate courseProgress={courseProgress} courseId={courseId} />
            <CourseRating courseId={courseId} userId={userId} />
        </>
    );
};

export default CourseActions;