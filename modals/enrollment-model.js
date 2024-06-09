import mongoose, { Schema } from 'mongoose';

const enrollmentSchema = new Schema({
    enrollment_date: {
        required: true,
        type: Date
    },
    status: {
        required: true,
        type: String
    },

    completion_date: {
        required: true,
        type: Date
    },

    method: {
        required: true,
        type: String
    },
    course_id: { type: Schema.ObjectId, ref: 'Course' },
    user_id: { type: Schema.ObjectId, ref: 'User' }
});

export const Enrollment =
    mongoose.models.Enrollment ?? mongoose.model('Enrollment', enrollmentSchema);
