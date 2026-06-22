'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimeCard } from '../ui/AnimeCard';
import { ParallaxScroll } from '../ui/ParallaxScroll';
import {
  Rocket,
  User,
  Briefcase,
  ShoppingBag,
  Users,
  Building,
} from 'lucide-react';

export function WhoWeServe() {
  const segments = [
    {
      title: 'Startups',
      desc: 'Scalable creative solutions that grow with you and match your speed.',
      icon: Rocket,
    },
    {
      title: 'Personal Brands',
      desc: 'High-quality content, visibility, and authority established at scale.',
      icon: User,
    },
    {
      title: 'Small Businesses',
      desc: 'Consistent, engaging marketing content that delivers real business results.',
      icon: Briefcase,
    },
    {
      title: 'E-commerce Brands',
      desc: 'Performance-driven visual assets and ads engineered to convert.',
      icon: ShoppingBag,
    },
    {
      title: 'Agencies',
      desc: 'AI-powered production support to streamline your design & content pipelines.',
      icon: Users,
    },
    {
      title: 'Corporate Brands',
      desc: 'Premium visual storytelling and high-end media production values.',
      icon: Building,
    },
  ];

  return (
    <section id="work" className="py-24 px-6 md:px-12 relative z-20 overflow-hidden bg-brand-linen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16 space-y-4"
        >
          <span className="font-space text-[12px] font-bold tracking-widest uppercase text-brand-teal">
            Who We Serve
          </span>
          <h2 className="font-sora text-4xl md:text-5xl font-bold tracking-tight text-brand-onyx">
            Built for Brands That <span className="text-brand-teal">Want to Grow.</span>
          </h2>
        </motion.div>

        {/* 3x2 Card Grid with Column Staggered Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {segments.map((segment, idx) => {
            const Icon = segment.icon;
            // stagger scroll yOffsets by grid column index
            const colOffsets = [-20, 20, -10];
            const offset = colOffsets[idx % 3];

            return (
              <ParallaxScroll key={segment.title} yOffset={offset} className="h-full">
                <AnimeCard
                  delay={idx * 0.08}
                  className="bg-white/80 backdrop-blur-md border border-brand-subtle/30 h-full"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 border border-brand-subtle flex items-center justify-center text-brand-teal">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sora text-lg font-bold text-brand-onyx">
                        {segment.title}
                      </h3>
                      <p className="font-sans text-sm text-brand-onyx/75 leading-relaxed">
                        {segment.desc}
                      </p>
                    </div>
                  </div>
                </AnimeCard>
              </ParallaxScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
