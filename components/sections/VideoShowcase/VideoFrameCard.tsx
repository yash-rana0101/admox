'use client';

import React from 'react';
import { motion, useTransform } from 'framer-motion';
import type { VideoFrameCardProps } from './types';

/**
 * Individual thumbnail image card with parallax vertical offset.
 * Shows a teal accent glow border when the parent video is active.
 */
export function VideoFrameCard({
  src,
  index,
  isActive,
  scrollProgress,
  totalFrames,
}: VideoFrameCardProps) {
  // Staggered parallax — each frame shifts at a different rate
  const parallaxRange = 30 + index * 15;
  const translateY = useTransform(
    scrollProgress,
    [0, 1],
    [parallaxRange, -parallaxRange]
  );

  const scale = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [0.95, 1, 0.95]
  );

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden group cursor-pointer"
      style={{
        y: translateY,
        scale,
        flex: '1 1 0',
        minHeight: 0,
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isActive ? 1 : 0.4, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Image */}
      <img
        src={src}
        alt={`Video frame ${index + 1}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-onyx/60 via-transparent to-transparent pointer-events-none" />

      {/* Active glow border */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-500"
        style={{
          boxShadow: isActive
            ? 'inset 0 0 0 2px rgba(37, 105, 81, 0.5), 0 0 20px rgba(37, 105, 81, 0.15)'
            : 'inset 0 0 0 1px rgba(37, 105, 81, 0.1)',
        }}
      />

      {/* Frame label */}
      <div className="absolute bottom-2 left-2.5 z-10">
        <span className="font-space text-[9px] tracking-[0.2em] text-white/80 uppercase font-bold">
          Frame {String(index + 1).padStart(2, '0')}/{String(totalFrames).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
}
