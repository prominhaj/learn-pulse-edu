import { replaceMongoIdInArray, replaceMongoIdInObject } from '@/lib/convertData';
import Category from '@/modals/categories-modal';

export const getCategories = async (isHome) => {
    try {
        const categories = await Category.find()
            .limit(isHome && 8)
            .lean();
        return replaceMongoIdInArray(categories);
    } catch (error) {
        throw new Error("Couldn't find categories");
    }
};

export const getCategoryDetails = async (categoryId) => {
    try {
        const category = await Category.findById(categoryId).lean();
        return replaceMongoIdInObject(category);
    } catch (error) {
        throw new Error(error);
    }
};
