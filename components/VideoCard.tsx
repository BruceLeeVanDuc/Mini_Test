"use client";

import { useEffect, useRef, useState } from "react";
import type { Video } from "../types/video";

type VideoCardProps = {
  video: Video;
  muted: boolean;
  onToggleMute: () => void;
};

export default function VideoCard({ video, muted, onToggleMute }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likesCount);

  // Đồng bộ trạng thái mute từ prop xuống thẻ <video>
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  // Auto-play / pause khi video vào / ra viewport (Intersection Observer)
  useEffect(() => {
    const el = containerRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        } else {
          vid.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      vid.currentTime = 0; // Tua về đầu khi pause
      setIsPlaying(false);
    }
  };

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((c) => c - 1);
    } else {
      setLiked(true);
      setLikesCount((c) => c + 1);
    }
  };

  const formatCount = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full snap-start snap-always flex items-center justify-center bg-black"
    >
      {/* Khung video 9:16 ở giữa (PC), full-screen trên mobile */}
      <div className="relative h-full w-full md:h-[90vh] md:w-auto md:aspect-[9/16] md:rounded-2xl overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={video.videoUrl}
          loop
          playsInline
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="h-full w-full object-cover cursor-pointer"
        />

        {/* Nút bật/tắt âm thanh ở góc trên phải */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute();
          }}
          aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
        >
          {muted ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.63 3.63a1 1 0 0 0 0 1.41L7.29 8.7 7 9H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3l3.29 3.29A1 1 0 0 0 12 17.59V14l5.59 5.59a1 1 0 0 0 1.41-1.42L5.05 3.63a1 1 0 0 0-1.42 0zM19 12a7 7 0 0 0-2.05-4.95l-1.42 1.42A5 5 0 0 1 17 12c0 .35-.04.7-.11 1.03l1.55 1.55c.36-.81.56-1.7.56-2.58zM12 4.41V8l1.59 1.59L12 8a1 1 0 0 0-1.71-.71l-.18.18L12 9.17v-.76l4.95 4.95.04-.04A7 7 0 0 0 12 4.41z" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 10v4a1 1 0 0 0 1 1h3l3.29 3.29A1 1 0 0 0 12 17.59V6.41a1 1 0 0 0-1.71-.71L7 9H4a1 1 0 0 0-1 1zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06A7 7 0 0 1 14 18.7v2.06A9 9 0 0 0 14 3.23z" />
            </svg>
          )}
        </button>

        {/* Overlay icon Play khi đang pause */}
        {!isPlaying && (
          <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                togglePlay();
            }}
            aria-label="Play"
            className="absolute inset-0 flex items-center justify-center bg-black/20 transition"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </span>
          </button>
        )}

        {/* Info: tên tác giả + mô tả (góc dưới trái) */}
        <div className="pointer-events-none absolute bottom-6 left-4 right-20 text-white drop-shadow-lg">
          <h3 className="text-lg font-semibold">{video.authorName}</h3>
          <p className="mt-1 text-sm leading-snug opacity-90">
            {video.description}
          </p>
        </div>

        {/* Dải nút tương tác bên phải: Like / Comment / Share */}
        <div className="absolute bottom-24 right-3 flex flex-col items-center gap-5">
          <button
            type="button"
            onClick={toggleLike}
            aria-label="Like"
            className="flex flex-col items-center gap-1 text-white"
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur transition active:scale-90 ${
                liked ? "text-red-500" : "text-white"
              }`}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21s-7.5-4.6-9.5-9.1C1 8.2 3.2 5 6.5 5c1.9 0 3.5 1 4.5 2.5C12 6 13.6 5 15.5 5 18.8 5 21 8.2 19.5 11.9 17.5 16.4 12 21 12 21z" />
              </svg>
            </span>
            <span className="text-xs font-medium">{formatCount(likesCount)}</span>
          </button>

          <button
            type="button"
            aria-label="Comment"
            className="flex flex-col items-center gap-1 text-white"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
              </svg>
            </span>
            <span className="text-xs font-medium">Comment</span>
          </button>

          <button
            type="button"
            aria-label="Share"
            className="flex flex-col items-center gap-1 text-white"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
              </svg>
            </span>
            <span className="text-xs font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
