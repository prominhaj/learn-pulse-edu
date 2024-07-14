import { getPlaiceholder } from 'plaiceholder';

export const getImage = async (src) => {
    if (!src) return null;

    const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));

    const {
        metadata: { height, width },
        ...plaiceholder
    } = await getPlaiceholder(buffer, {
        size: 10,
        format: ['png', 'jpg', 'jpeg', 'webp', 'avif']
    });

    return {
        ...plaiceholder,
        img: { src, height, width }
    };
};
