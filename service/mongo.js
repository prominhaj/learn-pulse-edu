import mongoose from 'mongoose';

export async function dbConnect() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        return conn;
    } catch (err) {
        console.error(err);
    }
}
