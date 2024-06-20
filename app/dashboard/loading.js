const DashBoardLoading = () => {
    return (
        <>
            <div className='flex items-center justify-center h-screen'>
                <div className='w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary animate-spin'>
                    <div className='flex items-center justify-center w-full h-full rounded-full bg-background'>
                        <div className='w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary animate-spin-reverse'>
                            <div className='flex items-center justify-center w-full h-full rounded-full bg-background'>
                                <div className='w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary animate-spin' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashBoardLoading;
