'use server';
import Module from '@/modals/modules-modal';

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
