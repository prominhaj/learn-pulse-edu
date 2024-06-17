import CreateCourseForm from './_components/CreateCourseForm';

const AddCourse = () => {
    return (
        <div className='flex h-full max-w-5xl p-6 mx-auto md:items-center md:justify-center'>
            <div className='max-w-full w-[536px]'>
                <CreateCourseForm />
            </div>
        </div>
    );
};

export default AddCourse;
