import LessonModalContent from '../../_components/lesson-modal-content';

const LessonEditPage = ({ params: { lessonId, courseId } }) => {
    return (
        <div className='sm:max-w-[1200px] w-[96%] overflow-y-auto max-h-[90vh] mx-auto my-5 px-5 md:my-8'>
            <LessonModalContent courseId={courseId} />
        </div>
    );
};

export default LessonEditPage;
