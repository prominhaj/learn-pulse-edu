import mongoose, { Schema } from 'mongoose';

const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        thumbnail: {
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            }
        },
        modules: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Module'
            }
        ],
        price: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        instructor: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        testimonials: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Testimonial'
            }
        ],
        quizSet: {
            type: Schema.Types.ObjectId,
            ref: 'QuizSet'
        }
    },
    { timestamps: true }
);

export const Course = mongoose.models.Course ?? mongoose.model('Course', courseSchema);
