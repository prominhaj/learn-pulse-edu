import mongoose, { Schema } from 'mongoose';

const watchHistoriesSchema = new Schema(
    {
        user_id: {
            type: Schema.ObjectId,
            ref: 'User',
            required: true
        },
        lesson_id: {
            type: Schema.ObjectId,
            ref: 'Lesson',
            required: true
        },
        module_id: {
            type: Schema.ObjectId,
            ref: 'Module',
            required: true
        },
        state: {
            type: String,
            required: true,
            default: 'watching'
        },
        last_time: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        collection: 'watch-histories',
        timestamps: true
    }
);

const WatchHistories =
    mongoose.models.WatchHistories ?? mongoose.model('WatchHistories', watchHistoriesSchema);

export default WatchHistories;
