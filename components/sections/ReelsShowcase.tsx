'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useScroll, motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CircularGallery, CircularGalleryRef } from '../ui/circular-gallery/CircularGallery';
import { GalleryItem } from '../ui/circular-gallery/types';
import { useReels } from '../../hooks/useReels';

const fallbackReelItems: GalleryItem[] = [
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

  const { reels, isLoading } = useReels();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    if (isLoading) return;
    return scrollYProgress.on('change', (latest) => {
      if (galleryRef.current) {
        galleryRef.current.setProgress(latest);
      }
    });
  }, [scrollYProgress, isLoading]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeImage]);

  const handleImageClick = useCallback((imageUrl: string) => {
    setActiveImage(imageUrl);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveImage(null);
  }, []);

  // Clean the text labels completely as requested: "remove the name from the images"
  const displayItems = useMemo(() => {
    return (reels.length > 0 ? reels : fallbackReelItems).map(item => ({
      ...item,
      text: '' // Set to empty string so WebGL doesn't render any text meshes
    }));
  }, [reels]);

  return (
    <section ref={containerRef} className="relative w-full z-25 bg-brand-linen">
      {/* DESKTOP STICKY SCROLL VIEW */}
      <div className="hidden lg:block h-[700vh] relative">
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
              AI GENERATED IMAGE POST CONTENT
            </h2>
            <p className="font-sans text-brand-onyx/75 text-base font-light max-w-2xl mx-auto">
              High-fidelity social graphics and post assets engineered programmatically. Zero physical setups, maximum aesthetic immersion.
            </p>
          </div>

          {/* WebGL Canvas Container */}
          <div className="relative z-10 w-full h-[55vh] flex items-center justify-center">
            {isLoading ? (
              <div className="flex gap-6 overflow-hidden w-full max-w-5xl justify-center py-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[160px] lg:w-[200px] aspect-[3/4] rounded-2xl bg-brand-onyx/5 animate-pulse border border-brand-teal/5"
                  />
                ))}
              </div>
            ) : (
              <CircularGallery
                ref={galleryRef}
                items={displayItems}
                bend={4}
                textColor="#252F2C" // Brand Onyx to blend with light mode
                borderRadius={0.06}
                font="bold 28px Space Grotesk"
                fontUrl="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap"
                scrollEase={0.04}
                onItemClick={(imageUrl, index) => {
                  const item = displayItems[index];
                  handleImageClick(item?.fullScale || imageUrl);
                }}
              />
            )}
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
            AI GENERATED IMAGE POST CONTENT
          </h2>
          <p className="font-sans text-brand-onyx/70 text-sm max-w-sm mx-auto">
            High-fidelity social graphics and post assets engineered programmatically.
          </p>
        </div>

        {/* Horizontal Drag Slider */}
        {isLoading ? (
          <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-none w-full">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[240px] aspect-[3/4] rounded-2xl bg-brand-onyx/5 animate-pulse border border-brand-teal/5"
              />
            ))}
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-none w-full scroll-smooth">
            {displayItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleImageClick(item.fullScale || item.image)}
                className="flex-shrink-0 w-[240px] aspect-[3/4] rounded-2xl overflow-hidden relative border border-brand-teal/10 shadow-md snap-center bg-white group cursor-pointer"
              >
                <img
                  src={item.image}
                  crossOrigin="anonymous"
                  alt={item.text}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {/* Mobile drag helper caption */}
        <div className="text-center">
          <span className="font-space text-[10px] tracking-wider text-brand-onyx/40 uppercase">
            ← Swipe to view more →
          </span>
        </div>
      </div>

      {/* Pop-up Image Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseModal}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 cursor-zoom-out select-none"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()} // Prevent close on clicking inner image
              className="relative max-w-4xl max-h-[85vh] w-full flex items-center justify-center pointer-events-auto"
            >
              <img
                src={activeImage}
                crossOrigin="anonymous"
                alt="AI Generated Content Zoom"
                className="max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10 select-none pointer-events-none"
              />
              <button
                onClick={handleCloseModal}
                className="absolute -top-12 right-0 lg:-right-12 lg:top-0 text-white hover:text-brand-teal transition-all p-2 rounded-full bg-brand-onyx/40 backdrop-blur-sm border border-white/10 hover:scale-105 duration-200 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default ReelsShowcase;
