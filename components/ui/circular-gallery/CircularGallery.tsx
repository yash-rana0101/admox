'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { CircularGalleryProps } from './types';
import { resolveFont } from './utils';
import { App } from './webgl-app';
import './CircularGallery.css';

export interface CircularGalleryRef {
  setProgress: (progress: number) => void;
}

const CircularGallery = forwardRef<CircularGalleryRef, CircularGalleryProps>(
  ({
    items,
    bend = 3,
    textColor = '#ffffff',
    borderRadius = 0.05,
    font = 'bold 30px Figtree',
    fontUrl,
    scrollSpeed = 2,
    scrollEase = 0.05
  }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<App | null>(null);

    useImperativeHandle(ref, () => ({
      setProgress: (progress: number) => {
        if (appRef.current) {
          appRef.current.setScrollProgress(progress);
        }
      }
    }));

    useEffect(() => {
      if (!containerRef.current) return;
      let app: App | null = null;
      let isMounted = true;

      resolveFont(font, fontUrl).then(resolvedFont => {
        if (!isMounted || !containerRef.current) return;
        app = new App(containerRef.current, {
          items,
          bend,
          textColor,
          borderRadius,
          font: resolvedFont,
          scrollSpeed,
          scrollEase,
          isDriven: true
        });
        appRef.current = app;
      });

      return () => {
        isMounted = false;
        if (app) {
          app.destroy();
        }
        appRef.current = null;
      };
    }, [items, bend, textColor, borderRadius, font, fontUrl, scrollSpeed, scrollEase]);

    return <div className="circular-gallery" ref={containerRef} />;
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };

