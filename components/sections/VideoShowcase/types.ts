import type { MotionValue } from 'framer-motion';

export interface YouTubeVideo {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  thumbnails: string[];
}

export interface YouTubePlayerProps {
  videoId: string;
  isActive: boolean;
  shouldLoad: boolean;
  isMuted: boolean;
}

export interface VideoFrameCardProps {
  src: string;
  index: number;
  isActive: boolean;
  scrollProgress: MotionValue<number>;
  totalFrames: number;
}

export interface VideoInfoPanelProps {
  title: string;
  subtitle: string;
  videoIndex: number;
}

export interface WireConnectorProps {
  nodeCount: number;
  isActive: boolean;
  scrollProgress: MotionValue<number>;
}
