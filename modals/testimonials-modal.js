import mongoose, { Schema } from 'mongoose';

const testimonialSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

const Testimonial =
    mongoose?.models?.Testimonial ?? mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
