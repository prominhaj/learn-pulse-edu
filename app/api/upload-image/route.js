import { updateCourse } from '@/app/actions/course';
import { fileUploader } from '@/app/actions/fileUploader';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
    try {
        const formData = await request.formData();
        const courseId = formData.get('courseId');
        const publicId = formData.get('public_id');

        // File upload
        const uploadResult = await fileUploader(formData, 'image', 'Images/courses', publicId);
        const image = {
            thumbnail: {
                url: uploadResult?.url,
                public_id: uploadResult?.public_id
            }
        };

        // Update Database
        await updateCourse(courseId, image);
        return NextResponse.json({
            success: true,
            status: 200,
            message: 'Course image updated successfully'
        });
    } catch (error) {
        return NextResponse.error(error);
    }
};
