'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

const videoSources = [
  '/videos/AMO E-bike ad.mp4',
  '/videos/Automatic Gates.mp4',
  '/videos/Automatic Roof and Window.mp4',
  '/videos/Retractable and PVC roofs .mp4',
  '/videos/SlidingShades.mp4',
  '/videos/TheBrokenVase.mp4',
];

interface ScrollVideoProps {
  src: string;
  isActive: boolean;
  shouldLoad: boolean;
}

function ScrollVideo({ src, isActive, shouldLoad }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isActiveRef = useRef(isActive);

  // Keep ref in sync so async callbacks can check current intent
  isActiveRef.current = isActive;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      // Wait for any pending pause to settle, then play only if still active
      const playAsync = async () => {
        try {
          await video.play();
        } catch (err) {
          // Silently ignore AbortError — happens when pause() interrupts play()
          if (err instanceof DOMException && err.name === 'AbortError') return;
          console.warn('Video playback failed:', err);
        }
      };

      playAsync();
    } else {
      // Only pause if the video is actually playing to avoid unnecessary state changes
      if (!video.paused) {
        video.pause();
      }
    }
  }, [isActive, shouldLoad]);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 1.03,
      }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}
    </motion.div>
  );
}

export function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Monitor scroll progress of the 600vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const N = videoSources.length;
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
            {videoSources.map((src, index) => {
              // Load if it is the active video, or immediate neighbors (for buffer/preloading)
              const shouldLoad =
                index === activeIndex ||
                index === activeIndex - 1 ||
                index === activeIndex + 1;

              const isActive = index === activeIndex;

              return (
                <ScrollVideo
                  key={src}
                  src={src}
                  isActive={isActive}
                  shouldLoad={shouldLoad}
                />
              );
            })}
          </div>

          {/* Simple overlay vignette to keep the transitions clean */}
          <div className="absolute inset-0 bg-black/10 z-5 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

export default VideoShowcase;
