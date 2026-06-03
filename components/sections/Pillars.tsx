'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Sparkles, Cpu, Activity, BookOpen, TrendingUp } from 'lucide-react';

export function Pillars() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const pillars = [
    {
      num: '01',
      title: 'Creativity',
      desc: 'Original concepts designed to help your brand cut through the noise and capture instant audience attention.',
      icon: Sparkles,
    },
    {
      num: '02',
      title: 'Innovation',
      desc: 'Cutting-edge artificial intelligence integrated with modern creative workflows to deliver assets at speed.',
      icon: Cpu,
    },
    {
      num: '03',
      title: 'Performance',
      desc: 'Content engineered to look exceptional and deliver measurable metrics: conversion, engagement, and retention.',
      icon: Activity,
    },
    {
      num: '04',
      title: 'Storytelling',
      desc: 'Building authentic emotional connections between brands and the audiences they are designed to serve.',
      icon: BookOpen,
    },
    {
      num: '05',
      title: 'Growth',
      desc: 'Aligning every visual asset and strategy with your core business development and revenue objectives.',
      icon: TrendingUp,
    },
  ];

  const handleHover = (idx: number) => {
    setActiveIndex(idx);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('webgl-pillar-hover', { detail: idx }));
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
    },
  };

  return (
    <section id="pillars" className="py-24 relative z-20 overflow-hidden w-full">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Sticky Title (Takes 4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-4">
            <span className="font-space text-[12px] font-bold tracking-widest uppercase text-brand-teal block">
              Why Admox
            </span>
            <h2 className="font-sora text-4xl md:text-5xl font-bold tracking-tight text-brand-onyx leading-tight">
              Five Pillars. <span className="text-brand-teal">One Vision.</span>
            </h2>
            <p className="font-sans text-brand-onyx/65 text-sm md:text-base leading-relaxed max-w-sm pt-2">
              Hover over or click each core pillar to explore our creative methodology and see our AI visual engine react.
            </p>
          </div>

          {/* Right Column: Interactive Accordion Panel (Takes 8 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-8 w-full border-t border-brand-subtle/30"
          >
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activeIndex === idx;

              return (
                <motion.div
                  key={pillar.num}
                  variants={itemVariants}
                  onMouseEnter={() => handleHover(idx)}
                  onClick={() => handleHover(idx)}
                  className={`border-b border-brand-subtle/30 py-6 flex gap-6 items-start transition-all duration-300 cursor-pointer select-none ${
                    isActive ? 'opacity-100' : 'opacity-40 hover:opacity-75'
                  }`}
                >
                  {/* Number */}
                  <span
                    className={`font-sora text-2xl md:text-3xl font-extrabold transition-all duration-300 shrink-0 ${
                      isActive ? 'text-brand-teal scale-105' : 'text-brand-onyx/30'
                    }`}
                  >
                    {pillar.num}
                  </span>

                  {/* Content Block */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <h3
                        className={`font-sora text-lg md:text-xl font-bold transition-all duration-300 ${
                          isActive ? 'text-brand-teal font-extrabold' : 'text-brand-onyx'
                        }`}
                      >
                        {pillar.title}
                      </h3>
                      
                      {/* Icon Indicator (Desktop only) */}
                      <div className="hidden md:flex items-center justify-center w-8 h-8 text-brand-teal shrink-0">
                        <motion.div
                          animate={{
                            rotate: isActive ? 360 : 0,
                            scale: isActive ? 1.15 : 0.8,
                          }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Expanding Description */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isActive ? 'auto' : 0,
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? 8 : 0,
                      }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-brand-onyx/75 text-sm md:text-base leading-relaxed pr-8">
                        {pillar.desc}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* USP Strip */}
      <div className="mt-24 bg-brand-onyx py-8 border-y border-brand-teal/20 text-brand-linen flex overflow-hidden">
        <div className="flex w-full justify-around text-center max-w-full mx-auto px-6 font-space text-[11px] md:text-xs font-bold uppercase tracking-widest leading-relaxed gap-6 flex-wrap select-none">
          <span>Faster turnaround</span>
          <span className="text-brand-teal">•</span>
          <span>Higher content volume</span>
          <span className="text-brand-teal">•</span>
          <span>Better efficiency</span>
          <span className="text-brand-teal">•</span>
          <span>Cost-effective production</span>
          <span className="text-brand-teal">•</span>
          <span>Trend-aware creative solutions</span>
        </div>
      </div>
    </section>
  );
}
