'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function Manifesto() {
  return (
    <section
      id="about"
      className="py-32 px-6 md:px-12 bg-brand-teal text-white relative z-20 overflow-hidden text-center flex items-center justify-center min-h-[80vh]"
    >
      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-space text-[12px] font-bold tracking-widest uppercase text-brand-linen bg-white/10 px-4 py-1.5 inline-block"
        >
          Our Belief
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-6 md:space-y-8"
        >
          <p className="font-sora text-2xl md:text-4xl lg:text-5xl font-light leading-snug">
            The future belongs to brands that move faster, think smarter, and create deeper connections.
          </p>

          <p className="font-sora text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            At Admox Media, we believe creativity is powerful.
            <span className="block text-brand-linen mt-2">AI makes it limitless.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto space-y-6 pt-6 font-sans text-brand-linen/80 text-base md:text-lg font-light leading-relaxed"
        >
          <p>
            We combine imagination, technology, and strategy to build content that inspires action and drives growth.
          </p>
          <p className="font-sora font-semibold text-white tracking-wide uppercase text-sm pt-4">
            Because great brands deserve more than content.
            <span className="block text-brand-linen mt-1">They deserve a vision.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
