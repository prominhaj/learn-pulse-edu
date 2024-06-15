import mongoose, { Schema } from 'mongoose';

const assessmentSchema = new Schema(
    {
        assessments: {
            required: true,
            type: Array
        },
        otherMarks: {
            required: true,
            type: Number
        }
    },
    {
        collection: 'quizAssessments'
    }
);

const Assessment = mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema);

export default Assessment;
