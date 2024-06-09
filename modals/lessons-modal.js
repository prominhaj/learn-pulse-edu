import mongoose, { Schema } from 'mongoose';

const lessonSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        video_url: {
            type: String,
            required: true
        },
        published: {
            type: Boolean,
            required: true,
            default: false
        },
        slug: {
            type: String,
            require: false
        },
        access: {
            type: String,
            required: true,
            default: 'public',
            enum: ['public', 'private']
        }
    },
    { timestamps: true }
);

export const Lesson = mongoose.models.Lesson ?? mongoose.model('Lesson', lessonSchema);
