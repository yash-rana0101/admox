import type { YouTubeVideo } from './types';

/**
 * Extract YouTube video ID from a youtu.be short URL.
 * e.g. "https://youtu.be/8MkuWYkcnBs" → "8MkuWYkcnBs"
 */
function extractVideoId(url: string): string {
  const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? '';
}

const videoData: Array<{
  url: string;
  title: string;
  subtitle: string;
  thumbnails: string[];
}> = [
  {
    url: 'https://youtu.be/2yLDj65QMEI',
    title: 'Brand Film',
    subtitle: 'Visual stories that define your identity',
    thumbnails: [
      '/assets/videos/1/1.png',
      '/assets/videos/1/2.png',
      '/assets/videos/1/3.png',
      '/assets/videos/1/4.png',
    ],
  },
  {
    url: 'https://youtu.be/oBS6GxwFPkE',
    title: 'Promotional Shoot',
    subtitle: 'Content that captures and converts',
    thumbnails: [
      '/assets/videos/2/1.png',
      '/assets/videos/2/2.png',
      '/assets/videos/2/3.png',
      '/assets/videos/2/4.png',
    ],
  },
  {
    url: 'https://youtu.be/rbxpPZP5gEA',
    title: 'Video Editing',
    subtitle: 'Raw footage to compelling narrative',
    thumbnails: [
      '/assets/videos/3/1.png',
      '/assets/videos/3/2.png',
      '/assets/videos/3/3.png',
      '/assets/videos/3/4.png',
    ],
  },
];

export const YOUTUBE_VIDEOS: YouTubeVideo[] = videoData.map((entry) => ({
  id: extractVideoId(entry.url),
  url: entry.url,
  title: entry.title,
  subtitle: entry.subtitle,
  thumbnails: entry.thumbnails,
}));

/**
 * Builds a YouTube nocookie embed URL with parameters that:
 * - Hide YouTube logo / branding as much as possible
 * - Disable related videos
 * - Always autoplay (muted videos are allowed by browser policy)
 * - Loop continuously
 */
export function buildEmbedUrl(videoId: string, isMuted: boolean = true): string {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: isMuted ? '1' : '0',
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
    enablejsapi: '1', // required for iframe api control
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export interface FrameConfig {
  top: number;
  left: number;
  w: number;
  h: number;
}

export const FRAMES: FrameConfig[] = [
  { top: 2, left: 10.5, w: 18.0, h: 20 },
  { top: 26, left: 0, w: 18.0, h: 20 },
  { top: 50, left: 1.68, w: 18.0, h: 20 },
  { top: 73, left: 7.56, w: 16.0, h: 18 },
];

export const PARALLAX_RANGES = [
  { start: 2.4, end: -2.4 },
  { start: 3.6, end: -1.2 },
  { start: 1.2, end: -3.6 },
  { start: 2.8, end: -2.0 },
];

export const LAYOUT_H = 600;
export const CONVERGE = { x: 470, y: 300 };
