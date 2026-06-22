'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { YouTubePlayerProps } from './types';
import { buildEmbedUrl } from './constants';

/**
 * Renders a single YouTube video via an iframe embed.
 * Uses youtube-nocookie.com for privacy and hides all branding/controls.
 * The iframe only renders when `shouldLoad` is true (lazy loading).
 * Autoplay is driven by the `isActive` prop.
 */
export function YouTubePlayer({ videoId, isActive, shouldLoad }: YouTubePlayerProps) {
  const embedUrl = useMemo(
    () => buildEmbedUrl(videoId),
    [videoId]
  );

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-hidden"
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 1.03,
      }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {shouldLoad && (
        <iframe
          src={embedUrl}
          title={`Showcase video ${videoId}`}
          allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
          allowFullScreen={false}
          loading="lazy"
          className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0"
        />
      )}
    </motion.div>
  );
}
