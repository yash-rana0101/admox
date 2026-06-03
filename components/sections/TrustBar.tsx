'use client';

import React from 'react';

const brands = [
  'NEXUS CREATIVE',
  'VERTEX LABS',
  'AURA DIGITAL',
  'ELEVATE MEDIA',
  'PRISM CORP',
  'KINETIC AI',
];

export function TrustBar() {
  const marqueeItems = [...brands, ...brands];

  return (
    <section id="trustbar" className="py-20 bg-brand-onyx text-white relative z-20 overflow-hidden border-b border-brand-teal/10">
      {/* Background Subtle Sparkle overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#256951_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Stats Grid Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center border-b border-white/10 pb-16 mb-12">
          <div className="space-y-1">
            <h3 className="font-sora text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white select-none">
              500+
            </h3>
            <p className="font-space text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">
              Projects Completed
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-sora text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white select-none">
              5+
            </h3>
            <p className="font-space text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">
              Years Experience
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-sora text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white select-none">
              10k+
            </h3>
            <p className="font-space text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">
              Content Pieces
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-sora text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white select-none">
              $10M+
            </h3>
            <p className="font-space text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">
              Revenue Driven
            </p>
          </div>
        </div>

        {/* Marquee Title */}
        <div className="mb-6">
          <p className="text-center font-space text-[11px] font-bold uppercase tracking-widest text-brand-teal">
            Trusted by ambitious brands across India
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div className="flex w-[200%] select-none">
        <div className="flex gap-20 animate-marquee items-center justify-around w-full shrink-0">
          {marqueeItems.map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="font-space text-lg md:text-xl font-bold tracking-widest text-white/20 hover:text-brand-teal transition-colors duration-300 whitespace-nowrap cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
