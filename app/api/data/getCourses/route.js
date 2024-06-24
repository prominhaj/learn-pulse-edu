import Category from '@/modals/categories-modal';
import Course from '@/modals/courses-modal';
import Module from '@/modals/modules-modal';
import { dbConnect } from '@/service/mongo';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        await dbConnect();
        const courses = await Course.find({
            active: true
        })
            .select(['title', 'subtitle', 'thumbnail', 'modules', 'price', 'category'])
            .populate({
                path: 'category',
                model: Category
            })
            .populate({
                path: 'modules',
                model: Module
            })
            .lean();

        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.error(error);
    }
};
