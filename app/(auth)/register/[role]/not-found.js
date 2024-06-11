import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const RegisterNotFoundPage = () => {
    return (
        <>
            <Card className='relative max-w-sm mx-auto dark:shadow-gray-800'>
                <CardHeader>
                    <CardTitle className='text-xl'>Not Found</CardTitle>
                    <CardDescription>Could not find requested resource</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link className={cn(buttonVariants({ size: 'sm' }), 'px-4 my-2')} href='/'>
                        Return Home
                    </Link>
                </CardContent>
            </Card>
        </>
    );
};

export default RegisterNotFoundPage;
