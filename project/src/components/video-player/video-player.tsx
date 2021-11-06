import React, {useEffect, useRef} from 'react';

const TIME_OUT_VIDEO = 100;

type VideoPlayerProps = {
  isPlaying: boolean;
  src: string;
  poster: string;
}

function VideoPlayerPreview({isPlaying, src, poster}: VideoPlayerProps): JSX.Element {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {

    let timeOut: ReturnType<typeof setTimeout>;

    if (videoRef.current && isPlaying) {
      timeOut = setTimeout(() => {
        videoRef.current?.play();
      }, TIME_OUT_VIDEO);
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

export default VideoPlayerPreview;
