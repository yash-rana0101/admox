'use client';

import React from 'react';

export function TrustBar() {
  return (
    <section id="trustbar" className="py-8 bg-brand-onyx text-white relative z-20 overflow-hidden border-b border-brand-teal/10">
      {/* Background Subtle Sparkle overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#256951_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Stats Grid Row */}
        <div className="grid grid-cols-3 gap-8 md:gap-12 text-center mx-auto">
          <div className="space-y-1">
            <h3 className="font-sora text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white select-none">
              150+
            </h3>
            <p className="font-space text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">
              Projects Completed
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-sora text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white select-none">
              3+
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
              Ai Frames Generated
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
