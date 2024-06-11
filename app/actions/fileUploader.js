import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const streamUpload = (fileStream, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: `learn-pulse-edu/${folder}`,
                resource_type: 'auto',
                unique_filename: true
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        fileStream.pipe(uploadStream);
    });
};

export const fileUploader = async (formData, fileName, folder) => {
    try {
        const file = formData.get(fileName);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const fileStream = new Readable();
        fileStream._read = () => {};
        fileStream.push(buffer);
        fileStream.push(null);

        const result = await streamUpload(fileStream, folder);
        return result;
    } catch (error) {
        throw new Error(`File upload failed: ${error.message}`);
    }
};
