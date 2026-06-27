export interface GalleryItem {
  image: string;
  text: string;
  fullScale?: string;
}

export interface CircularGalleryProps {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  scrollProgress?: number; // Driven externally by page sticky scroll
  onItemClick?: (imageUrl: string, index: number) => void;
}

export interface AppConfig {
  items?: GalleryItem[];
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  scrollSpeed: number;
  scrollEase: number;
  onItemClick?: (imageUrl: string, index: number) => void;
}
