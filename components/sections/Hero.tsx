'use client';

import React, { useRef, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { LogoArc } from './Hero/LogoArc';
import { AnimeText } from '../ui/AnimeText';

const PLAYBACK_RATE = 0.5;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = PLAYBACK_RATE;

    const handleCanPlay = () => {
      video.playbackRate = PLAYBACK_RATE;
    };

    video.addEventListener('canplay', handleCanPlay);
    return () => video.removeEventListener('canplay', handleCanPlay);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      }
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Layer 1: White base */}
      <div className="absolute inset-0 bg-white z-0" />

      {/* Layer 2: Video background pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[55vh] z-[1] pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-bottom"
        >
          <source src="/hero-landscape.mp4" type="video/mp4" />
        </video>
        {/* Smooth gradient fade at top edge */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-white via-white/70 to-transparent z-[1]" />
      </div>

      {/* Layer 3: Dome glow (brand teal/green tones) */}
      <div
        className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[88%] max-w-[880px] aspect-square rounded-full bg-gradient-to-b from-brand-subtle/50 via-brand-linen/30 to-transparent z-[2] pointer-events-none"
        style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 65%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 65%)' }}
      />

      {/* Layer 4: Floating Logo Arc */}
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[88%] max-w-[880px] aspect-square z-[3] pointer-events-none">
        <LogoArc />
      </div>

      {/* Layer 5: Main content (highest) */}
      <div className="flex-1 flex flex-col items-center justify-start pt-32 sm:pt-40 md:pt-44 pb-72 md:pb-80 px-6 relative z-[5]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl w-full flex flex-col items-center text-center"
        >


          {/* Headline */}
          <h1 className="font-serif text-[40px] sm:text-5xl md:text-6xl lg:text-[72px] font-normal text-brand-onyx leading-[1.12] tracking-tight max-w-3xl flex flex-col items-center gap-2">
            <AnimeText text="Your Haven for" className="font-serif" tag="span" splitBy="words" delay={100} />
            <span className="flex flex-wrap items-center justify-center gap-x-3">
              <AnimeText text="Seamless" className="italic font-serif text-brand-teal" tag="span" splitBy="chars" delay={400} />
              <AnimeText text="AI Solutions" className="font-serif" tag="span" splitBy="words" delay={700} />
            </span>
          </h1>

          {/* Subheading */}
          <motion.p 
            variants={itemVariants}
            className="font-sans text-sm sm:text-[15px] md:text-base text-brand-onyx/55 max-w-xl leading-relaxed mt-5"
          >
            Empowering you with intelligent, effortless tools to streamline your workflow, enhance
            collaboration, and achieve more—seamlessly.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3.5 mt-7"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center font-sans text-sm font-semibold text-white bg-brand-onyx hover:bg-brand-teal px-7 py-3 rounded-full transition-colors duration-300 shadow-[0_4px_16px_rgba(37,105,81,0.12)] cursor-pointer select-none"
            >
              Book a demo
            </a>
            
            {/* Play Button */}
            <button 
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white text-brand-onyx border border-brand-teal/10 shadow-[0_2px_10px_rgba(37,105,81,0.06)] hover:scale-105 transition-transform duration-300 cursor-pointer"
              aria-label="Watch video"
            >
              <svg 
                className="w-3.5 h-3.5 fill-current text-brand-onyx translate-x-[1px]" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
