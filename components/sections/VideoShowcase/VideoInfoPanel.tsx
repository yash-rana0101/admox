'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VideoInfoPanelProps } from './types';

/**
 * Displays video title + subtitle that animates in/out per active video.
 */
export function VideoInfoPanel({ title, subtitle, videoIndex }: VideoInfoPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={videoIndex}
        className="flex flex-col gap-2 pl-4"
        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Video number tag */}
        <span className="font-space text-[10px] tracking-[0.3em] text-brand-teal font-bold uppercase">
          Project {String(videoIndex + 1).padStart(2, '0')}
        </span>

        {/* Title */}
        <h3 className="font-sora text-xl lg:text-2xl font-bold text-brand-onyx tracking-tight leading-tight">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="font-sans text-sm text-brand-onyx/60 font-light leading-relaxed max-w-[200px]">
          {subtitle}
        </p>

        {/* Decorative accent line */}
        <div className="w-8 h-[2px] bg-brand-teal/40 rounded-full mt-1" />
      </motion.div>
    </AnimatePresence>
  );
}
