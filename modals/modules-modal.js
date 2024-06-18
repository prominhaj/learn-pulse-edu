import mongoose, { Schema } from 'mongoose';

const moduleSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        active: {
            type: Boolean,
            required: true,
            default: false
        },
        slug: {
            type: String,
            required: true
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        lessonIds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Lesson'
            }
        ],
        order: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { timestamps: true }
);

const Module = mongoose.models.Module ?? mongoose.model('Module', moduleSchema);
export default Module;
