"use client";

import { useEffect, useRef } from "react";
import videojs, { VideoJsPlayer } from "video.js";
import "video.js/dist/video-js.css";

function onMediaPlayerReady() {
  videojs.log("VideoJS media player is ready from the video-player.tsx");
}

export type Props = {
  options: {
    controls: boolean;
    responsive: boolean;
    fluid: boolean;
    fill: boolean;
    preload: "auto" | "metadata" | "none";
    sources: { src: string; type: string }[];
  };
  onPlayerReady?: (player: VideoJsPlayer) => void;
};

export default function VideoPlayer({ options, onPlayerReady }: Props) {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // init video.js player
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onMediaPlayerReady();
        onPlayerReady && onPlayerReady(player);
      }));
    } else {
      const player = playerRef.current;
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [options, playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} className="flex-1 h-[360px] lg:h-[480px]" />
    </div>
  );
}
