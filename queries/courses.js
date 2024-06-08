import { replaceMongoIdInArray } from '@/lib/convertData';
import Category from '@/modals/categories-modal';
import Course from '@/modals/couses-modal';
import Module from '@/modals/modules-modal';

export const getCourses = async () => {
    const courses = await Course.find({})
        .select(['title', 'subtitle', 'thumbnail', 'modules', 'price', 'category'])
        .populate({
            path: 'category',
            model: Category
        })
        .populate({
            path: 'modules',
            model: Module
        })
        .lean();
    return replaceMongoIdInArray(courses);
};
