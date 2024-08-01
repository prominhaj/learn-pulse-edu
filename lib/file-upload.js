import { storage } from '@/firebase.config';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

// Function to get video duration
const getVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = event.target.result;

            video.onloadedmetadata = () => {
                window.URL.revokeObjectURL(video.src);
                resolve(video.duration);
            };

            video.onerror = () => {
                reject('Error loading video metadata');
            };
        };

        reader.onerror = () => {
            reject('Error reading file');
        };

        reader.readAsDataURL(file);
    });
};

export const fileUpload = async (file, folderName, setProgress, _setDuration, existingFileName) => {
    if (!file) return;
    try {
        if (existingFileName) {
            await fileDelete(folderName, existingFileName);
        }

        const duration = await getVideoDuration(file);

        const storageRef = ref(storage, `${folderName}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const downloadURL = await new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = parseInt(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => reject(error),
                async () => {
                    try {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(url);
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        });

        return { downloadURL, duration };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const fileDelete = async (folderName, fileName) => {
    try {
        const fileRef = ref(storage, `${folderName}/${fileName}`);
        await deleteObject(fileRef);
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};
