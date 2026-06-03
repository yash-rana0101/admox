'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ManifestoBeliefCards } from './ManifestoBeliefCards';

const marqueeWords = [
  'CREATIVITY', '✦', 'INNOVATION', '✦', 'PERFORMANCE', '✦',
  'STORYTELLING', '✦', 'GROWTH', '✦', 'AI-POWERED', '✦',
  'STRATEGY', '✦', 'VISION', '✦',
];

export function Manifesto() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
  };

  const doubled = [...marqueeWords, ...marqueeWords];

  return (
    <section id="about" className="relative z-20 overflow-hidden bg-brand-onyx">
      {/* Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(37,105,81,0.15),transparent)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#256951_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Top Scrolling Word Strip */}
      <div className="border-b border-white/[0.06] py-4 overflow-hidden">
        <div className="flex w-[200%] select-none">
          <div className="flex gap-8 animate-marquee items-center w-full shrink-0">
            {doubled.map((word, i) => (
              <span
                key={i}
                className={`font-space text-[11px] font-bold tracking-[0.3em] whitespace-nowrap ${
                  word === '✦' ? 'text-brand-teal/60' : 'text-white/10'
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content: 2-Column Split */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left Column: Dramatic Typography */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-8 lg:sticky lg:top-32"
          >
            <motion.span variants={fadeUp} className="font-space text-[11px] font-bold tracking-[0.35em] uppercase text-brand-teal inline-block">
              Our Belief
            </motion.span>

            <div className="space-y-1">
              <motion.p variants={fadeUp} className="font-sora text-3xl md:text-4xl lg:text-[44px] text-white/40 font-light leading-tight">
                We believe creativity is
              </motion.p>
              <motion.p variants={fadeUp} className="font-sora text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-none tracking-tight">
                powerful.
              </motion.p>
              <motion.p variants={fadeUp} className="font-sora text-3xl md:text-4xl lg:text-[44px] text-white/40 font-light leading-tight pt-3">
                AI makes it
              </motion.p>
              <motion.p variants={fadeUp} className="font-sora text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-none tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-subtle to-brand-teal">
                  limitless.
                </span>
              </motion.p>
            </div>

            <motion.p variants={fadeUp} className="font-sans text-white/40 text-base md:text-lg leading-relaxed max-w-md font-light">
              The future belongs to brands that move faster, think smarter, and create deeper connections.
            </motion.p>

            {/* Decorative Teal Line */}
            <motion.div
              variants={fadeUp}
              className="h-px w-20 bg-gradient-to-r from-brand-teal to-transparent"
            />
          </motion.div>

          {/* Right Column: Belief Cards */}
          <ManifestoBeliefCards />
        </div>
      </div>

      {/* Bottom Closing Statement Strip */}
      <div className="border-t border-white/[0.06] py-6 md:py-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center font-sora text-xs md:text-sm font-semibold text-white/30 tracking-wide uppercase px-6"
        >
          Because great brands deserve more than content —{' '}
          <span className="text-brand-teal">they deserve a vision.</span>
        </motion.p>
      </div>
    </section>
  );
}
