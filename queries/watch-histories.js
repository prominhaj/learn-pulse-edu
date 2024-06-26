import { replaceMongoIdInObject } from '@/lib/convertData';
import WatchHistories from '@/modals/watch-histories-modal';

export const getLessonWatchHistory = async (filter) => {
    try {
        const watchHistory = await WatchHistories.findOne(filter)
            .sort({
                created_at: -1
            })
            .lean();
        return replaceMongoIdInObject(watchHistory);
    } catch (error) {
        throw new Error(error);
    }
};
