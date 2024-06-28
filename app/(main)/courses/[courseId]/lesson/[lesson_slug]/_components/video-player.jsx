"use client";
import { watchUpdate } from '@/app/actions/watch-histories';
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player';
import { useCallback } from 'react';

export const VideoPlayer = ({ url, courseId, lessonId, moduleId }) => {
  const router = useRouter();

  const handleOnStart = useCallback(async () => {
    const data = {
      courseId,
      lessonId,
      moduleId,
      state: 'watching',
      lastTime: 0,
    };
    try {
      await watchUpdate(data);
    } catch (error) {
      throw new Error(error);
    }
  }, [courseId, lessonId, moduleId]);

  const onEnded = useCallback(async () => {
    const data = {
      courseId,
      lessonId,
      moduleId,
      state: 'completed',
      lastTime: 0,
    };
    try {
      await watchUpdate(data);
      router.refresh();
    } catch (error) {
      throw new Error(error);
    }
  }, [courseId, lessonId, moduleId, router]);

  return (
    <div className="relative w-full aspect-video">
      <ReactPlayer
        className="w-full h-full"
        width="100%"
        height="100%"
        volume={1}
        playbackRate={1}
        controls={true}
        pip={false}
        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
        onEnded={onEnded}
        onStart={handleOnStart}
        url={url}
        progressInterval={3000}
      />
    </div>
  );
};
