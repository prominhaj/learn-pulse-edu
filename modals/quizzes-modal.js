import mongoose, { Schema } from 'mongoose';

const quizzesSchema = new Schema(
    {
        question: {
            required: true,
            type: String
        },
        description: {
            type: String
        },
        explanations: {
            type: String
        },
        slug: {
            type: String
        },
        options: {
            type: Array
        },
        mark: {
            required: true,
            default: 5,
            type: Number
        }
    },
    {
        timestamps: true
    }
);

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizzesSchema);

export default Quiz;
