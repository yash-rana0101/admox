'use client';

import { motion, Variants } from 'framer-motion';
import { Shield, Users } from 'lucide-react';
import { CardContent } from '../ui/Card';
import { AnimeCard } from '../ui/AnimeCard';
import { AIGeneratorVisual } from '../ui/AIGeneratorVisual';
import { CreativeVelocityVisual } from '../ui/CreativeVelocityVisual';
import { StrategicDepthVisual } from '../ui/StrategicDepthVisual';
import { AuthenticImpactVisual } from '../ui/AuthenticImpactVisual';
import { CollaborativeGrowthVisual } from '../ui/CollaborativeGrowthVisual';

const marqueeWords = [
  'CREATIVITY', '✦', 'INNOVATION', '✦', 'PERFORMANCE', '✦',
  'STORYTELLING', '✦', 'GROWTH', '✦', 'AI-POWERED', '✦',
  'STRATEGY', '✦', 'VISION', '✦',
];

export function Manifesto() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const doubled = [...marqueeWords, ...marqueeWords];

  return (
    <section id="about" className="relative z-20 overflow-hidden bg-brand-onyx py-24 md:py-32 w-full">
      {/* Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(37,105,81,0.15),transparent)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#256951_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Top Scrolling Word Strip */}
      <div className="absolute top-0 left-0 right-0 border-b border-white/[0.06] py-4 overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16 space-y-4"
        >
          <span className="font-space text-[11px] font-bold tracking-[0.35em] uppercase text-brand-teal block">
            Our Beliefs
          </span>
          <h2 className="font-sora text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Creativity is <span className="text-brand-subtle font-light">powerful.</span> AI makes it{' '}
            <span className="text-brand-subtle">
              limitless.
            </span>
          </h2>
          <p className="font-sans text-white/50 text-sm md:text-base leading-relaxed max-w-lg mx-auto pt-2">
            The future belongs to brands that move faster, think smarter, and create deeper connections.
          </p>
        </motion.div>

        {/* 5-Card Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="relative z-10 grid grid-cols-6 gap-4"
        >
          {/* Card 1: Creative Velocity (100% / 5X) */}
          <div className="col-span-full lg:col-span-2">
            <AnimeCard noDefaultPadding delay={0} className="relative h-full overflow-hidden bg-white/[0.02] border-white/[0.06] backdrop-blur-sm hover:border-brand-teal/30 hover:bg-white/[0.04] transition duration-500">
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <div className="pt-2">
                  <CreativeVelocityVisual />
                </div>
                <div className="relative z-10 mt-6 text-center space-y-2">
                  <h3 className="text-lg font-bold font-sora text-white">Creative Velocity</h3>
                  <p className="text-sm font-sans text-white/60">AI accelerates what humans imagine, turning weeks into hours.</p>
                </div>
              </CardContent>
            </AnimeCard>
          </div>

          {/* Card 2: Strategic Depth */}
          <div className="col-span-full sm:col-span-3 lg:col-span-2">
            <AnimeCard noDefaultPadding delay={0.08} className="relative h-full overflow-hidden bg-white/[0.02] border-white/[0.06] backdrop-blur-sm hover:border-brand-teal/30 hover:bg-white/[0.04] transition duration-500">
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <div className="pt-2">
                  <StrategicDepthVisual />
                </div>
                <div className="relative z-10 mt-6 text-center space-y-2">
                  <h3 className="text-lg font-bold font-sora text-white">Strategic Depth</h3>
                  <p className="text-sm font-sans text-white/60">Every visual decision is rooted in data, audience insight, and brand DNA.</p>
                </div>
              </CardContent>
            </AnimeCard>
          </div>

          {/* Card 3: Limitless Scale */}
          <div className="col-span-full sm:col-span-3 lg:col-span-2">
            <AnimeCard noDefaultPadding delay={0.16} className="relative h-full overflow-hidden bg-white/[0.02] border-white/[0.06] backdrop-blur-sm hover:border-brand-teal/30 hover:bg-white/[0.04] transition duration-500">
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <div className="pt-2">
                  <AIGeneratorVisual />
                </div>
                <div className="relative z-10 mt-6 text-center space-y-2">
                  <h3 className="text-lg font-bold font-sora text-white">Limitless Scale</h3>
                  <p className="text-sm font-sans text-white/60">From one asset to ten thousand. Our systems scale seamlessly with your ambition.</p>
                </div>
              </CardContent>
            </AnimeCard>
          </div>

          {/* Card 4: Authentic Impact */}
          <div className="col-span-full lg:col-span-3">
            <AnimeCard noDefaultPadding delay={0.12} className="relative h-full overflow-hidden lg:col-span-3 bg-white/[0.02] border-white/[0.06] backdrop-blur-sm hover:border-brand-teal/30 hover:bg-white/[0.04] transition duration-500">
              <CardContent className="grid p-8 sm:grid-cols-2 gap-6 h-full items-center">
                <div className="relative z-10 flex flex-col justify-between space-y-8 h-full">
                  <div className="relative flex aspect-square size-12 rounded-full border border-white/10 before:absolute before:-inset-2 before:rounded-full before:border before:border-white/5 text-brand-teal">
                    <Shield className="m-auto size-5" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-sora text-white">Authentic Impact</h3>
                    <p className="text-sm font-sans text-white/60">We build content that inspires action and drives real growth — not just vanity metrics.</p>
                  </div>
                </div>
                <div className="relative -mb-8 -mr-8 mt-6 sm:mt-0 h-full border-l border-t border-white/10 p-6 sm:ml-6 bg-black/20 rounded-tl-xl overflow-hidden flex flex-col justify-center">
                  <AuthenticImpactVisual />
                </div>
              </CardContent>
            </AnimeCard>
          </div>

          {/* Card 5: Collaborative Growth */}
          <div className="col-span-full lg:col-span-3">
            <AnimeCard noDefaultPadding delay={0.2} className="relative h-full overflow-hidden bg-white/[0.02] border-white/[0.06] backdrop-blur-sm hover:border-brand-teal/30 hover:bg-white/[0.04] transition duration-500">
              <CardContent className="grid p-8 sm:grid-cols-2 gap-6 h-full items-center">
                <div className="relative z-10 flex flex-col justify-between space-y-8 h-full">
                  <div className="relative flex aspect-square size-12 rounded-full border border-white/10 before:absolute before:-inset-2 before:rounded-full before:border before:border-white/5 text-brand-teal">
                    <Users className="m-auto size-5" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-sora text-white">Collaborative Growth</h3>
                    <p className="text-sm font-sans text-white/60">We work hand-in-hand with leading brands to co-create high-performing assets.</p>
                  </div>
                </div>
                <div className="relative mt-6 sm:-my-8 sm:-mr-8 bg-black/10 sm:py-6 overflow-hidden flex flex-col justify-center h-full">
                  <CollaborativeGrowthVisual />
                </div>
              </CardContent>
            </AnimeCard>
          </div>
        </motion.div>
      </div>

      {/* Bottom Closing Statement Strip */}
      <div className="border-t border-white/[0.06] py-6 md:py-8 mt-16">
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
