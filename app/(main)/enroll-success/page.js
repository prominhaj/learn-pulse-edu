import { Button } from '@/components/ui/button';
import { CircleCheck } from 'lucide-react';
import Link from 'next/link';

const Success = () => {
    return (
        <div className='flex flex-col items-center justify-center flex-1 w-full h-full'>
            <div className='flex flex-col items-center gap-6 max-w-[600px] text-center'>
                <CircleCheck className='w-32 h-32 p-0 text-white rounded-full bg-success' />
                <h1 className='text-xl md:text-2xl lg:text-3xl'>
                    Congratulations! You Enrollment was Successful
                </h1>
                <div className='flex items-center gap-3'>
                    <Button asChild size='sm'>
                        <Link href='/courses'>Browse Courses</Link>
                    </Button>
                    <Button asChild variant='outline' size='sm'>
                        <Link href='/think-in-a-redux-way/introduction'>Play Course</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default Success;
