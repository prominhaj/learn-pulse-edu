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
        state: { type: String, required: true },
        last_time: { type: Number }
    },
    {
        collection: 'watch-histories',
        timestamps: true
    }
);

const WatchHistories =
    mongoose.models.WatchHistories ?? mongoose.model('WatchHistories', watchHistoriesSchema);

export default WatchHistories;
