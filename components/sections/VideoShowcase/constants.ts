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
    url: 'https://youtu.be/8MkuWYkcnBs',
    title: 'Brand Film',
    subtitle: 'Visual stories that define your identity',
    thumbnails: [
      'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80',
    ],
  },
  {
    url: 'https://youtu.be/52F2O2RKYiI',
    title: 'Promotional Shoot',
    subtitle: 'Content that captures and converts',
    thumbnails: [
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&auto=format&fit=crop&q=80',
    ],
  },
  {
    url: 'https://youtu.be/9wqWt3KkQZk',
    title: 'Video Editing',
    subtitle: 'Raw footage to compelling narrative',
    thumbnails: [
      'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533702165324-66678e2069b2?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&auto=format&fit=crop&q=80',
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
