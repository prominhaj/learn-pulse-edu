import mongoose, { Schema } from 'mongoose';

const reportSchema = new Schema({
    total_completed_lesson: {
        type: Number
    },
    total_completed_modules: {
        type: Number
    },
    user_id: { type: Schema.ObjectId, ref: 'Course' },
    course_id: { type: Schema.ObjectId, ref: 'User' },
    quizAssessment: { type: Schema.ObjectId, ref: 'Assessment' }
});

const Report = mongoose.models.Report ?? mongoose.model('Report', reportSchema);

export default Report;
