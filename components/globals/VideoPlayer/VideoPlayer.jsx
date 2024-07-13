"use client";
import { useCallback } from "react";
import dynamic from 'next/dynamic';
import { watchUpdate } from "@/app/actions/watch-histories";
import { cn } from "@/lib/utils";

const DynamicReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export const VideoPlayer = ({ url, courseId, lessonId, moduleId, isLessonVideo, className }) => {

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
        } catch (error) {
            throw new Error(error);
        }
    }, [courseId, lessonId, moduleId]);

    return (
        <>
            <DynamicReactPlayer
                className={cn(className, "object-cover w-full h-full p-0 border rounded")}
                controls
                width="100%"
                config={{
                    file: {
                        attributes: {
                            controlsList: "nodownload"
                        }
                    }
                }}
                height="100%"
                autoPlay={true}
                preload="none"
                onPlay={isLessonVideo && handleOnStart}
                onEnded={isLessonVideo && onEnded}
                url={url}
            />
        </>
    );
};
