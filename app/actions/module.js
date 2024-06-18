'use server';
import Course from '@/modals/courses-modal';
import Module from '@/modals/modules-modal';

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
