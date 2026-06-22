import { useEffect, useRef } from 'react';
import { animate, remove } from 'animejs';

interface UseAnimeProps {
  targets: string | HTMLElement | (string | HTMLElement)[] | null | NodeList;
  triggerOnView?: boolean;
  viewThreshold?: number;
  animationProps: any;
}

export function useAnime({
  targets,
  triggerOnView = true,
  viewThreshold = 0.1,
  animationProps,
}: UseAnimeProps) {
  const hasAnimated = useRef(false);
  const animeInstance = useRef<any>(null);

  // Store animationProps in a ref so we don't re-run animations when props change reference
  const animationPropsRef = useRef(animationProps);
  useEffect(() => {
    animationPropsRef.current = animationProps;
  }, [animationProps]);

  useEffect(() => {
    if (!targets) return;

    const getElements = () => {
      if (typeof targets === 'string') {
        return document.querySelectorAll(targets);
      }
      return targets;
    };

    const runAnimation = (elements: any) => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      // In anime.js v4, animate takes elements as the first argument, and params as the second.
      const { targets: _, ...params } = animationPropsRef.current;
      animeInstance.current = animate(elements, params);
    };

    const elements = getElements();
    if (!elements) return;

    // Check if elements is a NodeList or an Array to observe each element
    const obsTargets: HTMLElement[] = [];
    if (elements instanceof NodeList) {
      elements.forEach((node) => {
        if (node instanceof HTMLElement) obsTargets.push(node);
      });
    } else if (Array.isArray(elements)) {
      elements.forEach((node) => {
        if (node instanceof HTMLElement) obsTargets.push(node);
      });
    } else if (elements instanceof HTMLElement) {
      obsTargets.push(elements);
    }

    if (triggerOnView && obsTargets.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runAnimation(elements);
              observer.disconnect();
            }
          });
        },
        { threshold: viewThreshold }
      );

      obsTargets.forEach((target) => observer.observe(target));

      return () => {
        observer.disconnect();
        remove(elements);
      };
    } else {
      runAnimation(elements);
      return () => {
        remove(elements);
      };
    }
  }, [targets, triggerOnView, viewThreshold]);

  return animeInstance;
}
