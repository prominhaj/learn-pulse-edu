import { replaceMongoIdInArray } from '@/lib/convertData';
import Category from '@/modals/categories-modal';

export const getCategories = async () => {
    const categories = await Category.find().lean();
    return replaceMongoIdInArray(categories);
};
