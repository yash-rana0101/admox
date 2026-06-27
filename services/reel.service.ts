import { GalleryItem } from '../components/ui/circular-gallery/types';

/**
 * Service to handle dynamic AI reels operations.
 */
export async function fetchReels(): Promise<GalleryItem[]> {
  try {
    const response = await fetch('/api/reels');
    if (!response.ok) {
      throw new Error(`Failed to fetch reels: ${response.statusText}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching reels in reel service:', error);
    return [];
  }
}
