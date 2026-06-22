import type { YouTubeVideo } from './types';

/**
 * Extract YouTube video ID from a youtu.be short URL.
 * e.g. "https://youtu.be/8MkuWYkcnBs" → "8MkuWYkcnBs"
 */
function extractVideoId(url: string): string {
  const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? '';
}

const youtubeUrls = [
  'https://youtu.be/8MkuWYkcnBs',
  'https://youtu.be/d7uIbJpQ7FM',
  'https://youtu.be/p_Xb_9nCszY',
  'https://youtu.be/xso05DAFZpI',
  'https://youtu.be/52F2O2RKYiI',
  'https://youtu.be/9wqWt3KkQZk',
];

export const YOUTUBE_VIDEOS: YouTubeVideo[] = youtubeUrls.map((url) => ({
  id: extractVideoId(url),
  url,
}));

/**
 * Builds a YouTube nocookie embed URL with parameters that:
 * - Hide YouTube logo / branding as much as possible
 * - Disable related videos
 * - Always autoplay (muted videos are allowed by browser policy)
 * - Loop continuously
 */
export function buildEmbedUrl(videoId: string): string {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    controls: '0',
    modestbranding: '1',
    rel: '0',
    showinfo: '0',
    iv_load_policy: '3', // hide annotations
    disablekb: '1',
    fs: '0', // hide fullscreen button
    playlist: videoId, // required for single-video loop
    playsinline: '1',
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}
