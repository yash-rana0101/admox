'use client';

import React from 'react';
import { StaggerTestimonials } from '../ui/stagger-testimonials';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative z-20 overflow-hidden w-full bg-transparent">
      <div className="w-full px-6 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-4">
          <span className="font-space text-[12px] font-bold tracking-widest uppercase text-brand-teal block">
            Client Feedback
          </span>
          <h2 className="font-sora text-4xl md:text-5xl font-bold tracking-tight text-brand-onyx leading-tight">
            What Brands Say About <span className="text-brand-teal">Admox Media.</span>
          </h2>
          <p className="font-sans text-brand-onyx/65 text-sm md:text-base leading-relaxed max-w-lg mx-auto pt-2">
            We help startups, creators, and enterprise brands scale their creative and content production. Here is their experience.
          </p>
        </div>

        {/* Carousel Component - Full Width */}
        <div className="w-full">
          <StaggerTestimonials />
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
