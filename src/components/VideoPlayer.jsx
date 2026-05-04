import React, { useRef, useState, useEffect } from "react";

const VideoPlayer = ({
  url,
  poster,
  className = "",
  controls = false,
  isRunning = false,
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(isRunning);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  return (
    <div
      onClick={togglePlay}
      className={`relative group overflow-hidden rounded-4xl glass border border-white/10 hover:cursor-pointer ${className}`}
    >
      <video
        ref={videoRef}
        src={url}
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
        loop
        playsInline
        controls={controls}
        autoPlay={isRunning}
      />

      {/* Overlay UI */}
      {!controls && (
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-500 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
        >
          <button
            onClick={togglePlay}
            className="w-20 h-20 flex hover:cursor-pointer items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:scale-110 transition-transform shadow-2xl"
          >
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-blue-500 transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
