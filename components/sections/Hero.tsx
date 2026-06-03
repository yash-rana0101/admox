'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '../ui/Button';

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
      }
    },
  };

  return (
    <section id="hero" className="relative bg-brand-linen z-20">
      {/* Curved Capsule Wrapper */}
      <div className="bg-white rounded-b-[60px] md:rounded-b-[100px] pt-40 pb-28 px-6 md:px-12 relative overflow-hidden flex flex-col items-center justify-center shadow-[0_10px_40px_rgba(37,105,81,0.02)]">
        {/* Subtle Decorative Grid Pattern inside White Container */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#256951_1px,transparent_1px),linear-gradient(to_bottom,#256951_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-6xl w-full flex flex-col items-center relative z-10"
        >
          {/* Centered Headline with Absolute Decorative Icons */}
          <motion.div variants={itemVariants} className="text-center relative max-w-4xl px-12 md:px-16">
            {/* Left arrow decoration (Absolute) */}
            <span className="text-brand-teal/30 absolute -left-2 md:left-4 top-2 hidden lg:inline-block shrink-0 pointer-events-none">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 8-pointed star / sparkle */}
                <path d="M50 10 L54 42 L86 46 L54 50 L50 82 L46 50 L14 46 L46 42 Z" fill="currentColor" />
              </svg>
            </span>
            
            <h1 className="font-sora text-4xl md:text-5xl lg:text-[60px] font-extrabold text-brand-onyx leading-[1.1] tracking-tight select-none">
              Empowering Brands Through Creative Vision
            </h1>

            {/* Right arrow decoration (Absolute) */}
            <span className="text-brand-teal/30 absolute -right-2 md:right-4 bottom-2 hidden lg:inline-block shrink-0 pointer-events-none">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M70 25 L32 50 L70 75" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M50 25 L12 50 L50 75" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              </svg>
            </span>
          </motion.div>

          {/* Subheading & Portrait Grid */}
          <motion.div 
            variants={itemVariants} 
            className="w-full mt-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8"
          >
            {/* Left Side: Editorial Description */}
            <div className="w-full lg:w-[28%] text-center lg:text-left space-y-4 relative">
              {/* Swirling Arrow SVG from text pointing to portrait */}
              <svg className="absolute -right-8 top-12 w-20 h-12 text-brand-teal/20 hidden lg:block pointer-events-none" viewBox="0 0 100 100" fill="none">
                <path d="M10 20 Q40 5, 80 50" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
                <path d="M80 50 L70 42 M80 50 L72 58" stroke="currentColor" strokeWidth="2.5" fill="none" />
              </svg>
              
              <span className="text-brand-teal font-space text-[12px] font-bold uppercase tracking-wider block">
                AI-Powered Strategy
              </span>
              <p className="font-sans text-brand-onyx/75 text-sm md:text-base leading-relaxed font-light">
                We combine human imagination with artificial intelligence to deliver modern strategies that elevate your brand voice and accelerate digital growth.
              </p>
              <div className="pt-2">
                <Button href="#about" variant="secondary" className="rounded-full py-2.5 px-6">
                  Innovate Your Brand
                </Button>
              </div>
            </div>

            {/* Center: The Circular Portrait */}
            <div className="relative flex items-center justify-center shrink-0">
              {/* Portrait Frame */}
              <div className="w-60 h-60 md:w-76 md:h-76 rounded-full overflow-hidden border-[6px] border-brand-linen shadow-[0_10px_35px_rgba(37,105,81,0.08)] bg-brand-linen/30 flex items-center justify-center">
                <img
                  src="/hero-portrait.png"
                  alt="Admox Media Creative profile"
                  className="w-full h-full object-cover object-top scale-105 pointer-events-none select-none"
                />
              </div>

              {/* Overlapping Pill buttons at the bottom of the portrait */}
              <div className="absolute -bottom-5 flex items-center justify-center gap-3 w-max">
                <Button 
                  href="#contact" 
                  className="rounded-full py-2.5 px-5 shadow-[0_4px_15px_rgba(37,105,81,0.2)] text-white bg-brand-teal border-brand-teal hover:bg-white hover:text-brand-teal whitespace-nowrap text-[11px] tracking-wider uppercase font-bold"
                >
                  Start Your Project
                </Button>
                <a
                  href="#contact"
                  className="h-10 px-5 inline-flex items-center justify-center font-space text-[11px] font-bold tracking-wider uppercase border border-brand-onyx bg-brand-onyx text-white hover:bg-transparent hover:text-brand-onyx transition-colors duration-300 rounded-full shadow-[0_4px_15px_rgba(37,47,44,0.15)] whitespace-nowrap"
                >
                  Let's Collaborate
                </a>
              </div>
            </div>

            {/* Right Side: Rating & Experience */}
            <div className="w-full lg:w-[28%] text-center lg:text-right space-y-4">
              <div className="inline-flex gap-1 text-[#f59e0b] justify-center lg:justify-end">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="space-y-1">
                <h3 className="font-sora text-3xl font-extrabold text-brand-onyx">5+ Years</h3>
                <p className="font-space text-[12px] font-bold text-brand-teal uppercase tracking-widest">
                  AI + Media Innovation
                </p>
              </div>
              <p className="font-sans text-brand-onyx/70 text-xs md:text-sm leading-relaxed max-w-[240px] mx-auto lg:mr-0 lg:ml-auto">
                Consistently delivering high-impact creative results through cutting-edge production workflows.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
