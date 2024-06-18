import LessonModal from './_component/LessonModal';

const LessonModalPage = ({ params: { lessonId, courseId } }) => {
    return <LessonModal courseId={courseId} />;
};

export default LessonModalPage;
