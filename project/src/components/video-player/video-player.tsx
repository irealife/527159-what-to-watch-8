import React, {useEffect, useRef} from 'react';

const START_VIDEO_TIMEOUT = 100;

type VideoPlayerProps = {
  isPlaying: boolean;
  src: string;
  poster: string;
}

function VideoPlayer({isPlaying, src, poster}: VideoPlayerProps): JSX.Element {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {

    let timeOut: ReturnType<typeof setTimeout>;

    if (videoRef.current && isPlaying) {
      timeOut = setTimeout(() => {
        videoRef.current?.play();
      }, START_VIDEO_TIMEOUT);
    }

    if (videoRef.current && !isPlaying) {
      videoRef.current.load();
    }

    return () => {
      clearTimeout(timeOut);
    };

  }, [isPlaying, videoRef]);

  return (
    <video ref={videoRef} src={src} poster={poster} muted width="280" height="175"/>
  );
}

export default VideoPlayer;
