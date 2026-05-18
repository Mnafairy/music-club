"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  videoUrl: string;
  posterUrl: string;
  title: string;
  index: string;
  duration: string;
};

export default function VideoLite({
  videoUrl,
  posterUrl,
  title,
  index,
  duration,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [posterSrc, setPosterSrc] = useState<string | null>(null);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPosterSrc(posterUrl);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [posterUrl]);

  return (
    <div
      ref={ref}
      className={`yt-lite${activated ? " activated" : ""}`}
      onClick={() => setActivated(true)}
    >
      {posterSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={`yt-thumb${posterLoaded ? " loaded" : ""}`}
          alt={title}
          loading="lazy"
          src={posterSrc}
          onLoad={() => setPosterLoaded(true)}
        />
      )}
      <div className="play-cta">
        <svg viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        ҮЗЭХ
      </div>
      <div className="video-meta">
        <span>► VIDEO.{index}</span>
        <span>{duration}</span>
      </div>
      {activated && (
        <video
          src={videoUrl}
          poster={posterUrl}
          title={title}
          controls
          autoPlay
          playsInline
          preload="none"
        />
      )}
    </div>
  );
}
