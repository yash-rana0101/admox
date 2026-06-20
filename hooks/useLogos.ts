import { useState, useEffect } from 'react';
import { fetchLogos } from '../services/logo.service';

export function useLogos() {
  const [logos, setLogos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadLogos() {
      try {
        setIsLoading(true);
        const data = await fetchLogos();
        if (isMounted) {
          setLogos(data);
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

    loadLogos();

    return () => {
      isMounted = false;
    };
  }, []);

  return { logos, isLoading, error };
}
