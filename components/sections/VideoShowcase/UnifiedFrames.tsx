'use client';

import React, { useRef } from 'react';
import { motion, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { FRAMES, PARALLAX_RANGES, FrameConfig } from './constants';
import { WirePath } from './WirePath';

interface UnifiedFramesProps {
  thumbnails: string[];
  videoIndex: number;
  scrollProgress: MotionValue<number>;
  videoDragX: MotionValue<number>;
  videoDragY: MotionValue<number>;
}

interface FrameCardProps {
  frame: FrameConfig;
  index: number;
  scrollProgress: MotionValue<number>;
  src: string;
  videoIndex: number;
  dragX: MotionValue<number>;
  dragY: MotionValue<number>;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

function FrameCard({
  frame,
  index,
  scrollProgress,
  src,
  videoIndex,
  dragX,
  dragY,
  constraintsRef,
}: FrameCardProps) {
  const range = PARALLAX_RANGES[index];

  const topStyle = useTransform(scrollProgress, (progress: number) => {
    const currentOffset = range.start + progress * (range.end - range.start);
    return `calc(${frame.top}% + ${currentOffset}%)`;
  });

  return (
    <motion.div
      key={`${videoIndex}-${index}`}
      className="frame-card group pointer-events-auto select-none"
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.05}
      dragMomentum={false}
      style={{
        top: topStyle,
        left: `${frame.left}%`,
        width: `${frame.w}%`,
        height: `${frame.h}%`,
        x: dragX,
        y: dragY,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <img
        src={src}
        alt={`Frame ${index + 1}`}
        className="frame-card-img pointer-events-none"
        loading="lazy"
      />
      <div className="frame-card-overlay" />
    </motion.div>
  );
}

interface UnifiedFrameGroupProps {
  thumbnails: string[];
  videoIndex: number;
  scrollProgress: MotionValue<number>;
  containerW: number;
  containerH: number;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  videoDragX: MotionValue<number>;
  videoDragY: MotionValue<number>;
}

function UnifiedFrameGroup({
  thumbnails,
  videoIndex,
  scrollProgress,
  containerW,
  containerH,
  constraintsRef,
  videoDragX,
  videoDragY,
}: UnifiedFrameGroupProps) {
  const drag0 = { x: useMotionValue(0), y: useMotionValue(0) };
  const drag1 = { x: useMotionValue(0), y: useMotionValue(0) };
  const drag2 = { x: useMotionValue(0), y: useMotionValue(0) };
  const drag3 = { x: useMotionValue(0), y: useMotionValue(0) };
  const dragValues = [drag0, drag1, drag2, drag3];

  return (
    <>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        {FRAMES.map((frame, i) => (
          <WirePath
            key={`wire-${i}`}
            frame={frame}
            index={i}
            scrollProgress={scrollProgress}
            dragX={dragValues[i].x}
            dragY={dragValues[i].y}
            containerW={containerW}
            containerH={containerH}
            videoDragX={videoDragX}
            videoDragY={videoDragY}
          />
        ))}
      </svg>

      {thumbnails.slice(0, 4).map((src, i) => (
        <FrameCard
          key={`${videoIndex}-${i}`}
          frame={FRAMES[i]}
          index={i}
          scrollProgress={scrollProgress}
          src={src}
          videoIndex={videoIndex}
          dragX={dragValues[i].x}
          dragY={dragValues[i].y}
          constraintsRef={constraintsRef}
        />
      ))}
    </>
  );
}

export function UnifiedFrames({
  thumbnails,
  videoIndex,
  scrollProgress,
  videoDragX,
  videoDragY,
}: UnifiedFramesProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 1000, height: 600 });

  React.useEffect(() => {
    if (!constraintsRef.current) return;
    const update = () => {
      setDimensions({
        width: constraintsRef.current?.clientWidth ?? 1000,
        height: constraintsRef.current?.clientHeight ?? 600,
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div ref={constraintsRef} className="absolute inset-0 w-full h-full pointer-events-none z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={videoIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <UnifiedFrameGroup
            thumbnails={thumbnails}
            videoIndex={videoIndex}
            scrollProgress={scrollProgress}
            containerW={dimensions.width}
            containerH={dimensions.height}
            constraintsRef={constraintsRef}
            videoDragX={videoDragX}
            videoDragY={videoDragY}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
