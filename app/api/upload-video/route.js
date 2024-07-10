import { updateCourse } from '@/app/actions/course';
import { fileUploader } from '@/app/actions/fileUploader';
import Lesson from '@/modals/lessons-modal';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
    try {
        const formData = await request.formData();
        const lessonId = formData.get('lessonId');
        const public_id = formData.get('public_id');
        const updateDatabaseName = formData.get('updateDatabaseName');
        const courseId = formData.get('courseId');

        // Video upload
        const videoUpload = await fileUploader(
            formData,
            'video_file',
            'Videos/Courses',
            public_id && public_id,
            'video'
        );

        const videoUrl = {
            duration: videoUpload?.duration?.toFixed(0),
            video: {
                url: videoUpload?.url,
                public_id: videoUpload?.public_id
            }
        };

        // Update database name if provided
        if (updateDatabaseName === 'course' && courseId) {
            await updateCourse(courseId, {
                introductionVideo: {
                    url: videoUpload?.url,
                    public_id: videoUpload?.public_id
                }
            });
        } else {
            // Update in Database
            await Lesson.findByIdAndUpdate(lessonId, videoUrl);
        }

        // Response
        return NextResponse.json({
            success: true,
            message: 'Video uploaded successfully',
            video: {
                url: videoUpload?.url,
                public_id: videoUpload?.public_id,
                duration: videoUpload?.duration?.toFixed(0)
            }
        });
    } catch (error) {
        throw new Error(error);
    }
};
