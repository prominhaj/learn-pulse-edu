import mongoose, { Schema } from 'mongoose';

const reportSchema = new Schema({
    totalCompletedLessons: {
        required: true,
        type: Array
    },
    totalCompletedModules: {
        required: true,
        type: Array
    },
    user_id: { type: Schema.ObjectId, ref: 'Course' },
    course_id: { type: Schema.ObjectId, ref: 'User' },
    quizAssessment: { type: Schema.ObjectId, ref: 'Assessment' }
});

const Report = mongoose.models.Report ?? mongoose.model('Report', reportSchema);

export default Report;
