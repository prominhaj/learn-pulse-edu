'use server';

import WatchHistories from '@/modals/watch-histories-modal';
import { getUserData } from '@/lib/getUserData';
import { getLesson } from '@/queries/lesson';
import { createWatchReport } from '@/queries/reports';
import { revalidatePath } from 'next/cache';

const STARTED = 'watching';
const COMPLETED = 'completed';

async function updateReport(userId, courseId, moduleId, lessonId) {
    try {
        await createWatchReport({ userId, courseId, moduleId, lessonId });
    } catch (err) {
        throw new Error(`Failed to create watch report: ${err.message}`);
    }
}

export const watchUpdate = async (data) => {
    const { courseId, lessonId, moduleId, state, lastTime } = data;

    if (![STARTED, COMPLETED].includes(state)) {
        throw new Error('Invalid state. Cannot process request.');
    }

    const lesson = await getLesson(lessonId);
    if (!lesson) {
        throw new Error('Invalid lesson. Cannot process request.');
    }

    const user = await getUserData();
    if (!user) {
        throw new Error('You are not authenticated.');
    }

    const watchEntry = {
        lesson_id: lesson.id,
        module_id: moduleId,
        user_id: user.id,
        state,
        lastTime
    };

    try {
        const found = await WatchHistories.findOne({
            lesson_id: lessonId,
            module_id: moduleId,
            user_id: user.id
        }).lean();

        if (!found) {
            await WatchHistories.create(watchEntry);
            if (state === COMPLETED) {
                await updateReport(user.id, courseId, moduleId, lessonId);
            }
        } else if (state === COMPLETED && found.state === STARTED) {
            await WatchHistories.findByIdAndUpdate(found._id, { state: COMPLETED });
            await updateReport(user.id, courseId, moduleId, lessonId);
        }

        if (lastTime && found) {
            await WatchHistories.findByIdAndUpdate(found._id, { last_time: lastTime });
        }

        // Revalidate Paths
        revalidatePath(`/courses/${courseId}/access?lesson=${lessonId}`);

        return {
            success: true,
            message: 'Watch updated successfully'
        };
    } catch (error) {
        throw new Error(`Failed to update watch: ${error.message}`);
    }
};
