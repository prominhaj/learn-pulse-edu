'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Error = ({ error, reset }) => {
    return (
        <div className='flex h-full max-w-5xl p-6 mx-auto md:items-center md:justify-center'>
            <Card className='max-w-full w-[536px]'>
                <CardHeader className='p-3'>
                    <CardTitle>
                        <h2 className='pt-2 text-lg font-medium text-center'>
                            Something went wrong!
                        </h2>
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col items-center gap-3'>
                    <p className='text-red-500'>{error.message}</p>
                    <div className='flex items-center gap-3'>
                        <Button size='sm' variant='destructive' onClick={() => reset()}>
                            Try again
                        </Button>
                        <Link href='/' className={cn(buttonVariants({ size: 'sm' }))}>
                            Return Home
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Error;
