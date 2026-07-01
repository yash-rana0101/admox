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
export function YouTubePlayer({ videoId, isActive, shouldLoad, isMuted }: YouTubePlayerProps) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  // We only rebuild the URL when the videoId changes so the iframe does not reload.
  // It initializes with the current isMuted state.
  const embedUrl = useMemo(
    () => buildEmbedUrl(videoId, isMuted),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [videoId]
  );

  // Dynamically control the volume/mute state of the active iframe
  React.useEffect(() => {
    if (!iframeRef.current || !isActive || !shouldLoad) return;

    const func = isMuted ? 'mute' : 'unMute';
    try {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func, args: [] }),
        '*'
      );
    } catch (err) {
      console.error('Error posting mute command to YouTube iframe:', err);
    }
  }, [isMuted, isActive, shouldLoad]);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-hidden rounded-xl"
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 1.02,
      }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
    >
      {shouldLoad && (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={`Showcase video ${videoId}`}
          allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
          allowFullScreen={false}
          loading="lazy"
          className="absolute top-1/2 left-1/2 w-[110%] h-[110%] -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0"
        />
      )}
    </motion.div>
  );
}
