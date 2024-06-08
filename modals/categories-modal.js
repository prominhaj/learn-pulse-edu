import { Schema } from 'mongoose';

const categorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    }
});

export const Category = mongoose.models.Category ?? mongoose.model('Category', categorySchema);
