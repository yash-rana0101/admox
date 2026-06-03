'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export function Pillars() {
  const pillars = [
    {
      num: '01',
      title: 'Creativity',
      desc: 'Original concepts that help brands stand out from the noise.',
    },
    {
      num: '02',
      title: 'Innovation',
      desc: 'Cutting-edge AI tools combined with modern creative processes.',
    },
    {
      num: '03',
      title: 'Performance',
      desc: 'Content designed not only to look great — but to deliver measurable results.',
    },
    {
      num: '04',
      title: 'Storytelling',
      desc: 'Building emotional connections between brands and the audiences they serve.',
    },
    {
      num: '05',
      title: 'Growth',
      desc: 'Every piece of content we create is aligned with your business growth objectives.',
    },
  ];

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
    <section id="pillars" className="py-24 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Title & Pillars */}
          <div className="space-y-16">
            <div className="space-y-4">
              <span className="font-space text-[12px] font-bold tracking-widest uppercase text-brand-teal">
                Why Admox
              </span>
              <h2 className="font-sora text-4xl md:text-5xl font-bold tracking-tight text-brand-onyx">
                Five Pillars. <span className="text-brand-teal">One Vision.</span>
              </h2>
            </div>

            {/* Pillars Numbered List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-10"
            >
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.num}
                  variants={itemVariants}
                  className="flex gap-6 md:gap-8 items-start group"
                >
                  <span className="font-sora text-4xl md:text-5xl font-extrabold text-brand-teal/20 group-hover:text-brand-teal transition-colors duration-300 select-none">
                    {pillar.num}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-sora text-xl font-bold text-brand-onyx">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-brand-onyx/70 text-sm md:text-base max-w-lg leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Spacing for WebGL canvas on desktop */}
          <div className="hidden lg:block h-[500px]" />
        </div>
      </div>

      {/* USP Strip */}
      <div className="mt-24 bg-brand-onyx py-8 border-y border-brand-teal/20 text-brand-linen flex overflow-hidden">
        <div className="flex w-full justify-around text-center max-w-7xl mx-auto px-6 font-space text-[11px] md:text-xs font-bold uppercase tracking-widest leading-relaxed gap-6 flex-wrap">
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
