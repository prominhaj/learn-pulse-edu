"use client";
import ReactPlayer from 'react-player'

export const VideoPlayer = ({ url }) => {
  return (
    <div className="relative w-full aspect-video">
      <ReactPlayer
        className="w-full h-full"
        width="100%"
        height="100%"
        controls
        fallback={"Loading..."}
        url={url}
      />
    </div>
  );
};
