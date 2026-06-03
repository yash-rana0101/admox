'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface Belief {
  label: string;
  desc: string;
}

const beliefs: Belief[] = [
  {
    label: 'Creative Velocity',
    desc: 'Move faster without sacrificing quality. AI accelerates what humans imagine, turning weeks into hours.',
  },
  {
    label: 'Strategic Depth',
    desc: 'Every visual decision is rooted in data, audience insight, and brand DNA — not guesswork.',
  },
  {
    label: 'Limitless Scale',
    desc: 'From one asset to ten thousand. Our AI-powered systems scale seamlessly with your ambition.',
  },
  {
    label: 'Authentic Impact',
    desc: 'We build content that inspires action and drives real growth — not just vanity metrics.',
  },
];

export function ManifestoBeliefCards() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="space-y-4"
    >
      {beliefs.map((belief, idx) => (
        <motion.div
          key={belief.label}
          variants={cardVariants}
          className="group relative p-6 md:p-7 border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-brand-teal/30 hover:bg-white/[0.05] transition-all duration-500 cursor-default overflow-hidden"
        >
          <div className="flex items-start gap-5 relative z-10">
            {/* Number */}
            <span className="font-sora text-3xl md:text-4xl font-extrabold text-white/[0.06] group-hover:text-brand-teal/25 transition-colors duration-500 select-none shrink-0 leading-none pt-1">
              0{idx + 1}
            </span>
            {/* Text */}
            <div className="space-y-2">
              <h3 className="font-sora text-base md:text-lg font-bold text-white/80 group-hover:text-brand-teal transition-colors duration-300">
                {belief.label}
              </h3>
              <p className="font-sans text-sm text-white/35 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                {belief.desc}
              </p>
            </div>
          </div>

          {/* Hover accent line — slides in from left */}
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-teal to-brand-teal/0 group-hover:w-full transition-all duration-700 ease-out" />

          {/* Subtle corner glow on hover */}
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-brand-teal/0 group-hover:bg-brand-teal/5 rounded-full blur-2xl transition-all duration-700 pointer-events-none" />
        </motion.div>
      ))}
    </motion.div>
  );
}
