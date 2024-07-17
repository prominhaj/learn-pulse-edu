import AddNewLiveForm from './_components/add-live-form';

export const dynamic = 'force-dynamic';

const AddLive = () => {
    return (
        <section className='py-8'>
            <div className='flex h-full max-w-5xl p-6 mx-auto md:items-center md:justify-center'>
                <div className='max-w-full w-[536px]'>
                    <AddNewLiveForm />
                </div>
            </div>
        </section>
    );
};

export default AddLive;
