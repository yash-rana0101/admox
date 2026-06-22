export interface YouTubeVideo {
  id: string;
  url: string;
}

export interface YouTubePlayerProps {
  videoId: string;
  isActive: boolean;
  shouldLoad: boolean;
}
