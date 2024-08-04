import { getPlaiceholder } from 'plaiceholder';

export const getImage = async (src) => {
    if (!src) return null;

    const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));

    if (buffer.length === 0)
        return {
            base64: '',
            img: { src: null, height: 0, width: 0 }
        };

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
