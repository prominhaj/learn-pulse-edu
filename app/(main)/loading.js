import Spinner from '@/components/globals/Spinner/Spinner';

const HomeLoading = () => {
    return (
        <div className='flex items-center justify-center h-screen'>
            <Spinner className='!w-10 !h-10' />
        </div>
    );
};

export default HomeLoading;
