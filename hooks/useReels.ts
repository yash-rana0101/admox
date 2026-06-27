import { useState, useEffect } from 'react';
import { GalleryItem } from '../components/ui/circular-gallery/types';
import { fetchReels } from '../services/reel.service';

export function useReels() {
  const [reels, setReels] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadReels() {
      try {
        setIsLoading(true);
        const data = await fetchReels();
        if (isMounted) {
          setReels(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadReels();

    return () => {
      isMounted = false;
    };
  }, []);

  return { reels, isLoading, error };
}
