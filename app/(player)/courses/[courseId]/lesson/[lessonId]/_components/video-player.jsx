"use client";
import { watchUpdate } from '@/app/actions/watch-histories';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Player from "next-video/player";
import ReactPlayer from 'react-player/youtube';

export const VideoPlayer = ({ video, courseId, lessonId, moduleId }) => {
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
      {
        video?.youtube ? (
          <div className="w-full h-full">
            <ReactPlayer
              onPlay={handleOnStart}
              onEnded={onEnded}
              controls={true}
              width="100%"
              height="100%"
              className="object-cover w-full h-full"
              url={"https://youtu.be/sutdp-aD748"}
            />
          </div>
        ) : (
          <Player
            onPlay={handleOnStart}
            onEnded={onEnded}
            className="object-cover w-full h-full"
            src={video?.url}
          />
        )
      }

    </div>
  );
};
