import mongoose, { Schema } from 'mongoose';

const quizSetSchema = new Schema(
    {
        title: {
            required: true,
            type: String
        },
        slug: {
            required: true,
            type: String
        },
        description: {
            required: true,
            type: String
        },
        quizIds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Quiz'
            }
        ],
        active: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true,
        collection: 'quizSets'
    }
);

const QuizSet = mongoose.models.QuizSet || mongoose.model('QuizSet', quizSetSchema);

export default QuizSet;
