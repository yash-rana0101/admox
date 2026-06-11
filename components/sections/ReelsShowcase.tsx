'use client';

import React, { useRef, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { CircularGallery, CircularGalleryRef } from '../ui/circular-gallery/CircularGallery';
import { GalleryItem } from '../ui/circular-gallery/types';

const reelItems: GalleryItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&auto=format&fit=crop',
    text: 'NEON DREAMS',
  },
  {
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop',
    text: 'FUTURE COUTURE',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
    text: 'MONOLITH',
  },
  {
    image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=600&auto=format&fit=crop',
    text: 'ABYSSAL',
  },
  {
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
    text: 'ORION-9',
  },
  {
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=600&auto=format&fit=crop',
    text: 'MIRAGE',
  },
  {
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=600&auto=format&fit=crop',
    text: 'PANDORA',
  },
  {
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    text: 'MERCURY',
  },
];

export function ReelsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<CircularGalleryRef>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (galleryRef.current) {
        galleryRef.current.setProgress(latest);
      }
    });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative w-full z-25 bg-brand-linen">
      {/* DESKTOP STICKY SCROLL VIEW */}
      <div className="hidden lg:block h-[220vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-16 bg-brand-linen">
          
          {/* Subtle Ambient Backdrop Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none z-0" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[200px] bg-brand-subtle/20 blur-[100px] rounded-full pointer-events-none z-0" />

          {/* Top Header */}
          <div className="relative z-10 text-center t-10 space-y-3 px-6 sm:px-8 select-none max-w-3xl mx-auto">
            <span className="font-space text-xs tracking-[0.35em] text-brand-teal font-extrabold uppercase">
              PORTFOLIO HIGHLIGHT
            </span>
            <h2 className="font-sora text-4xl lg:text-5xl font-bold tracking-tight text-brand-onyx">
              AI REELS LAB
            </h2>
            <p className="font-sans text-brand-onyx/75 text-base font-light max-w-2xl mx-auto">
              Vertical cinematic micro-content engineered programmatically. Zero physical setups, maximum aesthetic immersion.
            </p>
          </div>

          {/* WebGL Canvas Container */}
          <div className="relative z-10 w-full h-[55vh] flex items-center justify-center">
            <CircularGallery
              ref={galleryRef}
              items={reelItems}
              bend={4}
              textColor="#252F2C" // Brand Onyx to blend with light mode
              borderRadius={0.06}
              font="bold 28px Space Grotesk"
              fontUrl="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap"
              scrollEase={0.04}
            />
          </div>
        </div>
      </div>

      {/* MOBILE SCROLL/DRAG PREVIEW */}
      <div className="block lg:hidden py-16 px-6 space-y-10 bg-brand-linen">
        
        {/* Mobile Header */}
        <div className="space-y-3 text-center">
          <span className="font-space text-xs tracking-[0.25em] text-brand-teal font-bold uppercase block">
            PORTFOLIO HIGHLIGHT
          </span>
          <h2 className="font-sora text-3xl font-bold text-brand-onyx">
            AI REELS LAB
          </h2>
          <p className="font-sans text-brand-onyx/70 text-sm max-w-sm mx-auto">
            Vertical cinematic micro-content engineered programmatically.
          </p>
        </div>

        {/* Horizontal Drag Slider */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-none w-full scroll-smooth">
          {reelItems.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[240px] aspect-[9/16] rounded-2xl overflow-hidden relative border border-brand-teal/10 shadow-md snap-center bg-white group"
            >
              <img
                src={item.image}
                alt={item.text}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-onyx/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-space text-[9px] tracking-widest text-brand-teal font-bold uppercase mb-1 block">
                  REEL 0{idx + 1}
                </span>
                <h3 className="font-sora text-base font-bold text-white uppercase tracking-wide">
                  {item.text}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile drag helper caption */}
        <div className="text-center">
          <span className="font-space text-[10px] tracking-wider text-brand-onyx/40 uppercase">
            ← Swipe to view more →
          </span>
        </div>
      </div>
    </section>
  );
}
