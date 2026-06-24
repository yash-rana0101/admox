'use client';

import React, { useRef } from 'react';
import { motion, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface FrameConfig {
  top: number;
  left: number;
  w: number;
  h: number;
}

export const FRAMES: FrameConfig[] = [
  { top: 2, left: 10.5, w: 12.6, h: 20 },
  { top: 28, left: 0, w: 11.76, h: 20 },
  { top: 54, left: 1.68, w: 11.76, h: 20 },
  { top: 78, left: 7.56, w: 12.6, h: 18 },
];

export const PARALLAX_RANGES = [
  { start: 2.4, end: -2.4 },
  { start: 3.6, end: -1.2 },
  { start: 1.2, end: -3.6 },
  { start: 2.8, end: -2.0 },
];

const LAYOUT_H = 600;
const CONVERGE = { x: 470, y: 300 };

interface UnifiedFramesProps {
  thumbnails: string[];
  videoIndex: number;
  scrollProgress: MotionValue<number>;
  videoDragX: MotionValue<number>;
  videoDragY: MotionValue<number>;
}

interface WirePathProps {
  frame: FrameConfig;
  index: number;
  scrollProgress: MotionValue<number>;
  dragX: MotionValue<number>;
  dragY: MotionValue<number>;
  containerW: number;
  containerH: number;
  videoDragX: MotionValue<number>;
  videoDragY: MotionValue<number>;
}

function WirePath({
  frame,
  index,
  scrollProgress,
  dragX,
  dragY,
  containerW,
  containerH,
  videoDragX,
  videoDragY,
}: WirePathProps) {
  const range = PARALLAX_RANGES[index];
  const a = {
    x: (frame.left + frame.w) * 10,
    y: (frame.top + frame.h / 2) * 6,
  };

  const dynamicCoord = useTransform(
    [scrollProgress, dragX, dragY, videoDragX, videoDragY],
    (latest: unknown) => {
      const [progress, dx, dy, vdx, vdy] = latest as [number, number, number, number, number];
      const currentOffset = range.start + progress * (range.end - range.start);
      const frameTop = frame.top + currentOffset;
      const frameCenterY = frameTop + frame.h / 2;
      const scrollYViewBox = (frameCenterY / 100) * LAYOUT_H;

      const dxViewBox = (dx / containerW) * 1000;
      const dyViewBox = (dy / containerH) * 600;

      const vdxViewBox = (vdx / containerW) * 1000;
      const vdyViewBox = (vdy / containerH) * 600;

      return {
        x: a.x + dxViewBox,
        y: scrollYViewBox + dyViewBox,
        vx: CONVERGE.x + vdxViewBox,
        vy: CONVERGE.y + vdyViewBox,
      };
    }
  );

  const dVal = useTransform(dynamicCoord, (coord: unknown) => {
    const { x, y, vx, vy } = coord as { x: number; y: number; vx: number; vy: number };
    const cp1x = x + (vx - x) * 0.55;
    const cp2x = x + (vx - x) * 0.75;
    return `M ${x} ${y} C ${cp1x} ${y}, ${cp2x} ${vy}, ${vx} ${vy}`;
  });

  const rectXVal = useTransform(dynamicCoord, (coord: unknown) => (coord as { x: number }).x - 5);
  const rectYVal = useTransform(dynamicCoord, (coord: unknown) => (coord as { y: number }).y - 5);

  return (
    <g>
      <motion.path d={dVal} className="wire-path" />
      <motion.rect
        x={rectXVal}
        y={rectYVal}
        width={10}
        height={10}
        rx={2}
        className="wire-node"
      />
    </g>
  );
}

interface FrameCardProps {
  frame: FrameConfig;
  index: number;
  scrollProgress: MotionValue<number>;
  src: string;
  videoIndex: number;
  dragX: MotionValue<number>;
  dragY: MotionValue<number>;
  constraintsRef: React.RefObject<HTMLDivElement>;
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
  constraintsRef: React.RefObject<HTMLDivElement>;
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

  const mainNodeCoord = useTransform(
    [videoDragX, videoDragY],
    (latest: unknown) => {
      const [vdx, vdy] = latest as [number, number];
      const vdxViewBox = (vdx / containerW) * 1000;
      const vdyViewBox = (vdy / containerH) * 600;
      return {
        x: CONVERGE.x - 6 + vdxViewBox,
        y: CONVERGE.y - 6 + vdyViewBox,
      };
    }
  );

  const mainNodeX = useTransform(mainNodeCoord, (coord: unknown) => (coord as { x: number }).x);
  const mainNodeY = useTransform(mainNodeCoord, (coord: unknown) => (coord as { y: number }).y);

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

        <motion.rect
          x={mainNodeX}
          y={mainNodeY}
          width={12}
          height={12}
          rx={3}
          className="wire-node wire-node--main"
        />
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
