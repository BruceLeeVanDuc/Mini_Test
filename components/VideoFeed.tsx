"use client";

import { useState } from "react";
import { videos } from "../data/video";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  // State chung: tất cả video cùng mute / unmute để UX nhất quán
  const [muted, setMuted] = useState(true);

  return (
    <div
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black"
      style={{ scrollbarWidth: "none" }}
    >
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          muted={muted}
          onToggleMute={() => setMuted((m) => !m)}
        />
      ))}
    </div>
  );
}
