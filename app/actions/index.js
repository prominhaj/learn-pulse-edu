'use server';

import { redirect } from 'next/navigation';

export const formAccessCourse = async (courseId, formatLessonId) => {
    redirect(`/courses/${courseId}/access${formatLessonId && `?lesson=${formatLessonId}`}`);
};
