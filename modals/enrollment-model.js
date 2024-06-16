import mongoose, { Schema } from 'mongoose';

const enrollmentSchema = new Schema({
    enrollment_date: {
        required: true,
        default: Date.now(),
        type: Date
    },
    status: {
        required: true,
        type: String
    },

    completion_date: {
        required: false,
        type: Date
    },

    method: {
        required: true,
        type: String
    },
    course_id: { type: Schema.ObjectId, ref: 'Course' },
    user_id: { type: Schema.ObjectId, ref: 'User' }
});

const Enrollment = mongoose.models.Enrollment ?? mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
