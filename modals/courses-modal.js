import mongoose, { Schema } from 'mongoose';

const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        sub_title: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        thumbnail: {
            url: {
                type: String
            },
            public_id: {
                type: String
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
            default: 0,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
            default: false
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
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
        learning: {
            type: [String]
        },
        quizSet: {
            type: Schema.Types.ObjectId,
            ref: 'QuizSet'
        }
    },
    { timestamps: true }
);

const Course = mongoose.models?.Course ?? mongoose.model('Course', courseSchema);

export default Course;
