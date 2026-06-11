'use client';

import { MagicBento } from '../ui/MagicBento';

export function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 relative z-20 overflow-hidden bg-brand-linen">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-4">
          <span className="font-space text-[12px] font-bold tracking-widest uppercase text-brand-teal">
            What We Do
          </span>
          <h2 className="font-sora text-4xl md:text-5xl font-bold tracking-tight text-brand-onyx">
            Creative Power. <span className="text-brand-teal">AI Precision.</span>
          </h2>
          <p className="font-sans text-brand-onyx/70 text-lg">
            From strategy to execution — we deliver premium content at the speed your brand demands.
          </p>
        </div>

        {/* Magic Bento Grid */}
        <MagicBento 
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={14}
          glowColor="37, 105, 81" // Brand Teal: RGB (37, 105, 81)
        />
      </div>
    </section>
  );
}
