import { Button } from '@/components/ui/button';
import { VideoPlayer } from './_components/video-player';
import VideoDescription from './_components/video-description';

const Course = () => {
    return (
        <>
            <div className='flex flex-col'>
                <div className='w-full'>
                    <VideoPlayer url='https://www.youtube.com/embed/6UetbQmhOzs?si=-_oSm1-6Pg6koAt0" title="YouTube video player' />
                </div>
                <div>
                    <div className='flex flex-col items-center justify-between py-3 md:py-4 md:flex-row'>
                        <h2 className='mb-2 text-xl font-semibold md:text-2xl'>Introduction</h2>
                        <div className='flex items-center gap-3'>
                            <Button className='h-7 md:h-auto' variant='outline'>
                                Back
                            </Button>
                            <Button className='h-7 md:h-auto'>Next</Button>
                        </div>
                    </div>
                    {/* <Separator /> */}
                    <VideoDescription />
                </div>
            </div>
        </>
    );
};
export default Course;
