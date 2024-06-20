'use server';
import Course from '@/modals/courses-modal';
import Lesson from '@/modals/lessons-modal';
import Module from '@/modals/modules-modal';
import { revalidatePath } from 'next/cache';
import { deleteFile } from './fileUploader';
import mongoose from 'mongoose';

export const createModule = async (data) => {
    try {
        const title = data.get('title');
        const slug = data.get('slug');
        const courseId = data.get('courseId');
        const order = data.get('order');

        const createdModule = await Module.create({ title, slug, course: courseId, order });

        const course = await Course.findById(courseId);
        course.modules.push(createdModule._id);
        course.save();

        // Revalidate Path
        revalidatePath(`/dashboard/courses/${courseId}`);

        return JSON.parse(JSON.stringify(createdModule));
    } catch (e) {
        throw new Error(e);
    }
};

export const reOrderModules = async (data) => {
    try {
        await Promise.all(
            data.map(async (element) => {
                await Module.findByIdAndUpdate(element.id, { order: element.position });
            })
        );
    } catch (e) {
        throw new Error(e);
    }
};

export const updateModule = async (moduleId, moduleData) => {
    try {
        await Module.findByIdAndUpdate(moduleId, moduleData);
    } catch (error) {
        throw new Error(error);
    }
};

export const modulePublished = async (moduleId) => {
    try {
        const getModule = await Module.findById(moduleId);
        await Module.findByIdAndUpdate(moduleId, {
            active: !getModule?.active
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const moduleDelete = async (moduleId, courseId) => {
    try {
        await mongoose.connection.transaction(async (session) => {
            const getModule = await Module.findById(moduleId).session(session);
            if (!getModule) {
                throw new Error('Module not found');
            }

            const { lessonIds } = getModule;
            if (lessonIds?.length > 0) {
                const lessons = await Lesson.find({ _id: { $in: lessonIds } }).session(session);

                const deleteFilesPromises = lessons
                    .filter((lesson) => lesson.video?.public_id)
                    .map((lesson) => deleteFile(lesson.video.public_id));
                await Promise.all(deleteFilesPromises);

                await Lesson.deleteMany({ _id: { $in: lessonIds } }).session(session);
            }

            await Course.findByIdAndUpdate(courseId, { $pull: { modules: moduleId } }, { session });

            await Module.findByIdAndDelete(moduleId).session(session);

            // Revalidate Path
            revalidatePath(`/dashboard/courses/${courseId}`);
        });
    } catch (error) {
        throw new Error(error.message);
    }
};
