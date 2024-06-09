import Course from '@/modals/courses-modal';
import { dbConnect } from '@/service/mongo';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    const data = await req.json();
    try {
        // connect DB
        const conn = await dbConnect();
        // create new course
        await Course.create(data);
        return NextResponse.json({
            success: true,
            message: 'Course created successfully'
        });
    } catch (error) {
        return NextResponse.error(error.message);
    }
};
