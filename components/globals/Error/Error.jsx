"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Error = ({ error, reset, content }) => {
    return (
        <div className='flex w-full h-full max-w-5xl p-6 mx-auto mt-5 md:mt-10 md:items-center md:justify-center'>
            <div className='max-w-full w-[536px] p-3 overflow-hidden transition duration-300 border rounded-lg bg-background'>
                <CardHeader className='p-3'>
                    <CardTitle>
                        <h2 className='pt-2 text-lg font-medium text-center'>
                            {content}
                        </h2>
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col items-center gap-3'>
                    <p className='text-red-500'>{error.message}</p>
                </CardContent>
                <CardFooter>
                    <div className='flex flex-wrap items-center justify-center w-full gap-3'>
                        <Button size='sm' variant='destructive' onClick={() => reset()}>
                            Try again
                        </Button>
                        <Link href='/' className={cn(buttonVariants({ size: 'sm' }))}>
                            Return Home
                        </Link>
                    </div>
                </CardFooter>
            </div>
        </div>
    );
};

export default Error;