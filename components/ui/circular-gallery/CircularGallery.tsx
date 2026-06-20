'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
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
    const [hasError, setHasError] = useState(false);

    useImperativeHandle(ref, () => ({
      setProgress: (progress: number) => {
        if (appRef.current) {
          appRef.current.setScrollProgress(progress);
        }
      }
    }));

    useEffect(() => {
      if (hasError || !containerRef.current) return;
      let app: App | null = null;
      let isMounted = true;

      resolveFont(font, fontUrl).then(resolvedFont => {
        if (!isMounted || !containerRef.current) return;
        try {
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
        } catch (error) {
          console.error("CircularGallery WebGL initialization failed:", error);
          if (isMounted) {
            setHasError(true);
          }
        }
      }).catch(error => {
        console.error("CircularGallery font resolution failed:", error);
        if (isMounted) {
          setHasError(true);
        }
      });

      return () => {
        isMounted = false;
        if (app) {
          app.destroy();
        }
        appRef.current = null;
      };
    }, [items, bend, textColor, borderRadius, font, fontUrl, scrollSpeed, scrollEase, hasError]);

    if (hasError) {
      return (
        <div className="w-full h-full flex items-center justify-start overflow-x-auto gap-6 px-12 py-4 scrollbar-none select-none">
          {(items ?? []).map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[200px] aspect-[9/16] rounded-2xl overflow-hidden relative border border-brand-teal/10 shadow-md bg-white group"
            >
              <img
                src={item.image}
                alt={item.text}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-onyx/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-space text-[9px] tracking-widest text-brand-teal font-bold uppercase mb-1 block">
                  REEL 0{idx + 1}
                </span>
                <h3 className="font-sora text-sm font-bold text-white uppercase tracking-wide">
                  {item.text}
                </h3>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return <div className="circular-gallery" ref={containerRef} />;
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };

