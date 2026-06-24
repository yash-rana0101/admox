'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { YouTubePlayer } from './VideoShowcase/YouTubePlayer';
import { UnifiedFrames } from './VideoShowcase/UnifiedFrames';
import { YOUTUBE_VIDEOS } from './VideoShowcase/constants';
import './VideoShowcase/VideoShowcase.css';

export function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const N = YOUTUBE_VIDEOS.length;

  const videoDragX = useMotionValue(0);
  const videoDragY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Derive active video index from scroll position
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const index = Math.min(Math.floor(latest * N), N - 1);
      setActiveIndex(index);
    });
  }, [scrollYProgress, N]);

  // Reset drag position on video transition
  useEffect(() => {
    videoDragX.set(0);
    videoDragY.set(0);
  }, [activeIndex, videoDragX, videoDragY]);

  // Per-video local progress (0→1 within each video segment)
  const localProgress = useTransform(scrollYProgress, (v) => {
    const index = Math.min(Math.floor(v * N), N - 1);
    const segmentSize = 1 / N;
    const segmentStart = index * segmentSize;
    return Math.min(Math.max((v - segmentStart) / segmentSize, 0), 1);
  });

  const activeVideo = YOUTUBE_VIDEOS[activeIndex];

  return (
    <section ref={containerRef} className="relative w-full bg-brand-linen z-25">
      {/* ── DESKTOP: Sticky split layout ── */}
      <div className="hidden lg:block relative" style={{ height: `${N * 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

          {/* Centered Section Header */}
          <div className="text-center pt-10 pb-6 select-none relative z-20 px-6">
            <span className="font-space text-[10px] tracking-[0.35em] text-brand-teal font-bold uppercase block mb-2">
              Our Work
            </span>
            <h2 className="font-sora text-4xl lg:text-5xl font-bold text-brand-onyx tracking-tight">
              Video Showcase
            </h2>
            <p className="font-sans text-brand-onyx/50 text-sm font-light mt-3 max-w-lg mx-auto">
              Scroll to explore our latest productions — brand films, promos, and cinematic edits.
            </p>
          </div>

          {/* Split Content Area */}
          <div className="flex-1 flex items-center px-8 lg:px-16 relative">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="showcase-layout w-full max-w-[1400px] mx-auto">
              {/* Unified overlay containing both wire lines and bento frame cards */}
              <UnifiedFrames
                thumbnails={activeVideo.thumbnails}
                videoIndex={activeIndex}
                scrollProgress={localProgress}
                videoDragX={videoDragX}
                videoDragY={videoDragY}
              />

              {/* LEFT Column — Empty placeholder to preserve the split grid layout */}
              <div />

              {/* RIGHT — Video player container aligned left with padding */}
              <div className="showcase-video-container flex items-center justify-start">
                <motion.div
                  className="showcase-video-wrap cursor-grab active:cursor-grabbing pointer-events-auto"
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.05}
                  dragMomentum={false}
                  style={{
                    x: videoDragX,
                    y: videoDragY,
                  }}
                >
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
                  <div className="showcase-counter">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: Stacked layout ── */}
      <MobileVideoList />
    </section>
  );
}

/** Mobile stacked layout — extracted to stay under 300 lines */
function MobileVideoList() {
  return (
    <div className="block lg:hidden py-16 px-6 space-y-12 bg-brand-linen">
      <div className="text-center space-y-2">
        <span className="font-space text-[10px] tracking-[0.3em] text-brand-teal font-bold uppercase block">
          Our Work
        </span>
        <h2 className="font-sora text-2xl font-bold text-brand-onyx">Video Showcase</h2>
      </div>

      {YOUTUBE_VIDEOS.map((video, index) => (
        <div key={video.id} className="space-y-4">

          {/* Mobile bento grid — 2x2 */}
          <div className="grid grid-cols-2 gap-2">
            {video.thumbnails.slice(0, 4).map((thumb, i) => (
              <div
                key={i}
                className={`rounded-lg overflow-hidden ${i === 0 ? 'row-span-2' : ''}`}
              >
                <img
                  src={thumb}
                  alt={`${video.title} frame ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0`}
              title={video.title}
              allow="encrypted-media"
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoShowcase;
