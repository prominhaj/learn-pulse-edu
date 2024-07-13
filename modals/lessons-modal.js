import mongoose, { Schema } from 'mongoose';

const lessonSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        duration: {
            type: Number,
            default: 0,
            required: true
        },
        video: {
            url: {
                type: String
            },
            fileName: {
                type: String
            }
        },
        active: {
            type: Boolean,
            required: true,
            default: false
        },
        slug: {
            type: String,
            require: true
        },
        access: {
            type: String,
            required: true,
            default: 'private',
            enum: ['public', 'private']
        },
        order: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { timestamps: true }
);

const Lesson = mongoose.models?.Lesson ?? mongoose.model('Lesson', lessonSchema);

export default Lesson;
