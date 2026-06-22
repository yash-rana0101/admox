'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { YouTubePlayer } from './VideoShowcase/YouTubePlayer';
import { YOUTUBE_VIDEOS } from './VideoShowcase/constants';

export function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const N = YOUTUBE_VIDEOS.length;
      const index = Math.min(Math.floor(latest * N), N - 1);
      setActiveIndex(index);
    });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative w-full bg-black">
      {/* Sticky container that keeps the video full screen (100vh) */}
      <div className="h-[600vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full z-0">
            {YOUTUBE_VIDEOS.map((video, index) => {
              const shouldLoad =
                index === activeIndex ||
                index === activeIndex - 1 ||
                index === activeIndex + 1;

              return (
                <YouTubePlayer
                  key={video.id}
                  videoId={video.id}
                  isActive={index === activeIndex}
                  shouldLoad={shouldLoad}
                />
              );
            })}
          </div>

          {/* Overlay vignette to keep transitions clean */}
          <div className="absolute inset-0 bg-black/10 z-5 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

export default VideoShowcase;
