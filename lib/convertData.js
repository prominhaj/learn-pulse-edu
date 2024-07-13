export const replaceMongoIdInArray = (array = []) => {
    if (!Array.isArray(array)) {
        throw new TypeError('Expected an array');
    }

    return array.map((item) => {
        const { _id, ...rest } = item;
        return {
            id: _id.toString(),
            ...rest
        };
    });
};

export const replaceMongoIdInObject = (obj) => {
    if (!obj) return null;
    const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
    return updatedObj;
};

export const getSlug = (title) => {
    if (!title) return null;

    const slug = title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[0]/g, '-')
        .replace(/[^\w-]+/g, '');

    return slug;
};

export const getTitleFromSlug = (slug) => {
    if (!slug) return null;

    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

    return title;
};
