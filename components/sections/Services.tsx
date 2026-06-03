'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import {
  Film,
  Camera,
  Scissors,
  Smartphone,
  Play,
  Palette,
  Share2,
  BookOpen,
  Sparkles,
  Cpu,
  Layers,
  Compass,
  Box,
  BarChart2,
  TrendingUp,
} from 'lucide-react';

export function Services() {
  const creativeServices = [
    { name: 'Brand Films', desc: 'Visual stories that define your identity', icon: Film },
    { name: 'Promotional Shoots', desc: 'Content that converts viewers to buyers', icon: Camera },
    { name: 'Video Editing', desc: 'Raw footage transformed into compelling narratives', icon: Scissors },
    { name: 'Reels Production', desc: 'Scroll-stopping short-form vertical content', icon: Smartphone },
    { name: 'YouTube Editing', desc: 'Engaging long-form content that increases retention', icon: Play },
    { name: 'Graphic Design', desc: 'Design that communicates before you say a word', icon: Palette },
    { name: 'Social Media Creatives', desc: 'Consistent, on-brand, high-impact graphics', icon: Share2 },
    { name: 'Brand Storytelling', desc: 'The narrative that makes people care and connect', icon: BookOpen },
  ];

  const aiServices = [
    { name: 'AI Video Editing', desc: 'Faster. Smarter. Still human at heart.', icon: Cpu },
    { name: 'AI Graphic Design', desc: 'Stunning visual concepts at creative speed', icon: Sparkles },
    { name: 'AI Content Creation', desc: 'Strategy-backed content & copywriting at scale', icon: Layers },
    { name: 'AI Visual Concepts', desc: 'Ideate visual moods faster than your competitors', icon: Compass },
    { name: 'AI Mockups', desc: 'Visualize your final product before manufacturing', icon: Box },
    { name: 'AI Media Planning', desc: 'Data-driven creative content distribution', icon: BarChart2 },
    { name: 'AI Content Strategy', desc: 'Know exactly what to say, and when to say it', icon: TrendingUp },
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
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

        {/* Services Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Creative Services Card */}
          <Card delay={0.1}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-brand-subtle/30">
                <div className="w-10 h-10 bg-brand-linen flex items-center justify-center text-brand-teal">
                  <Film className="w-5 h-5" />
                </div>
                <h3 className="font-sora text-2xl font-bold text-brand-onyx">Creative Services</h3>
              </div>
              <ul className="space-y-6">
                {creativeServices.map((service, idx) => {
                  const IconComponent = service.icon;
                  return (
                    <li key={idx} className="flex gap-4 group">
                      <div className="w-8 h-8 rounded-none border border-brand-subtle flex items-center justify-center text-brand-teal/80 shrink-0 group-hover:bg-brand-teal group-hover:text-white transition-colors duration-300">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-space text-sm font-semibold text-brand-onyx group-hover:text-brand-teal transition-colors duration-300">
                          {service.name}
                        </h4>
                        <p className="font-sans text-xs text-brand-onyx/60 mt-1">{service.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Card>

          {/* AI-Powered Services Card */}
          <Card delay={0.2}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-brand-subtle/30">
                <div className="w-10 h-10 bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-sora text-2xl font-bold text-brand-onyx">AI-Powered Services</h3>
              </div>
              <ul className="space-y-6">
                {aiServices.map((service, idx) => {
                  const IconComponent = service.icon;
                  return (
                    <li key={idx} className="flex gap-4 group">
                      <div className="w-8 h-8 rounded-none border border-brand-subtle flex items-center justify-center text-brand-teal/80 shrink-0 group-hover:bg-brand-teal group-hover:text-white transition-colors duration-300">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-space text-sm font-semibold text-brand-onyx group-hover:text-brand-teal transition-colors duration-300">
                          {service.name}
                        </h4>
                        <p className="font-sans text-xs text-brand-onyx/60 mt-1">{service.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
