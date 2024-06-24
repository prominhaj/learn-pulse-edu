import Category from '@/modals/categories-modal';
import { dbConnect } from '@/service/mongo';
import { NextResponse } from 'next/server';

export const GET = async () => {
    await dbConnect();
    try {
        const categories = await Category.find().lean();
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.error(error);
    }
};
