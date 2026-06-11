'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

interface Project {
  id: string;
  tag: string;
  title: string;
  description: React.ReactNode;
  videoUrl: string;
}

const projects: Project[] = [
  {
    id: '01',
    tag: '01 / BRAND CINEMA',
    title: 'ELEVATING BRAND STORIES',
    description: (
      <>
        Generated entirely using <strong className="text-brand-teal font-semibold">Generative AI models</strong> with <span className="text-white font-medium">zero physical production setups</span>. Highlights our core <strong className="text-brand-teal font-semibold">AI Brand Film Production & Visual Strategy</strong> service, delivering high-impact cinema-grade assets at scale.
      </>
    ),
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
  },
  {
    id: '02',
    tag: '02 / MOTION LAB',
    title: 'GEOMETRIC LIGHTING',
    description: (
      <>
        Synthesized programmatically via <strong className="text-brand-teal font-semibold">AI motion interpolation</strong>, completely bypassing traditional render farms or camera rigs. Showcases our <strong className="text-brand-teal font-semibold">Motion Graphics & AI-Powered Digital Asset Design</strong> capabilities.
      </>
    ),
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-loop-41852-large.mp4',
  },
  {
    id: '03',
    tag: '03 / AUDIOWAVE',
    title: 'OCEANIC BRAND IDENTITY',
    description: (
      <>
        A fluid wave sequence rendered through <strong className="text-brand-teal font-semibold">generative neural networks</strong> with no physical footprints or traditional crew setups. Highlights our <strong className="text-brand-teal font-semibold">Minimalist Branding & Generative Content Strategy</strong> to establish authority.
      </>
    ),
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-ocean-near-the-shore-41584-large.mp4',
  },
];

export function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll tracking for sticky scroll reveal (using 400vh for 4 steps: intro + 3 projects)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate active index (0 = Intro, 1 = Proj 1, 2 = Proj 2, 3 = Proj 3)
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (latest < 0.25) {
        setActiveIndex(0);
      } else if (latest < 0.5) {
        setActiveIndex(1);
      } else if (latest < 0.75) {
        setActiveIndex(2);
      } else {
        setActiveIndex(3);
      }
    });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative w-full bg-brand-onyx">
      {/* DESKTOP FULL-WIDTH STICKY SCROLL REVEAL */}
      <div className="hidden lg:block h-[400vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
          
          {/* Full-width Video Background Layer */}
          <div className="absolute inset-0 w-full h-full z-0">
            {projects.map((project, idx) => {
              // Video 1 corresponds to index 0 (First Look) and index 1 (Project 1)
              const isVisible = (idx === 0 && (activeIndex === 0 || activeIndex === 1)) ||
                                (idx === 1 && activeIndex === 2) ||
                                (idx === 2 && activeIndex === 3);

              return (
                <motion.div
                  key={project.id}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 1.03,
                    filter: isVisible ? 'blur(0px)' : 'blur(8px)',
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                  <video
                    src={project.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
            
            {/* Dark Cinematic Vignette Overlay to maintain text contrast */}
            <div className="absolute inset-0 bg-black/55 z-5 pointer-events-none" />
          </div>

          {/* Centered Content Layer */}
          <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col items-center space-y-4"
              >
                {activeIndex === 0 && (
                  <>
                    <span className="font-space text-xs tracking-[0.3em] text-brand-teal font-extrabold uppercase">
                      STUDIO PORTFOLIO
                    </span>
                    <h2 className="font-sora text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                      FIRST LOOK
                    </h2>
                    <p className="font-sans text-brand-linen/80 text-base font-light leading-relaxed max-w-xl mx-auto">
                      All cinematic works below are <strong className="text-brand-teal font-semibold">100% AI-generated</strong>. Created with <span className="text-white font-medium">no production-grade setup or camera rigs</span>, highlighting the next generation of creative services provided by Admox.
                    </p>
                  </>
                )}

                {activeIndex === 1 && (
                  <>
                    <span className="font-space text-xs tracking-[0.3em] text-brand-teal font-extrabold uppercase">
                      {projects[0].tag}
                    </span>
                    <h2 className="font-sora text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                      {projects[0].title}
                    </h2>
                    <p className="font-sans text-brand-linen/80 text-base font-light leading-relaxed max-w-lg mx-auto">
                      {projects[0].description}
                    </p>
                  </>
                )}

                {activeIndex === 2 && (
                  <>
                    <span className="font-space text-xs tracking-[0.3em] text-brand-teal font-extrabold uppercase">
                      {projects[1].tag}
                    </span>
                    <h2 className="font-sora text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                      {projects[1].title}
                    </h2>
                    <p className="font-sans text-brand-linen/80 text-base font-light leading-relaxed max-w-lg mx-auto">
                      {projects[1].description}
                    </p>
                  </>
                )}

                {activeIndex === 3 && (
                  <>
                    <span className="font-space text-xs tracking-[0.3em] text-brand-teal font-extrabold uppercase">
                      {projects[2].tag}
                    </span>
                    <h2 className="font-sora text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                      {projects[2].title}
                    </h2>
                    <p className="font-sans text-brand-linen/80 text-base font-light leading-relaxed max-w-lg mx-auto">
                      {projects[2].description}
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Scroll Watermark Indicator */}
          <div className="absolute bottom-12 z-20 flex flex-col items-center gap-2">
            <span className="font-space text-[10px] tracking-[0.25em] text-white/45 uppercase font-semibold">
              {activeIndex === 0 ? 'Scroll to enter portfolio' : `Project 0${activeIndex} of 03`}
            </span>
            <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-brand-teal"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE LIST LAYOUT */}
      <div className="block lg:hidden py-16 px-6 space-y-12 bg-gradient-to-b from-[#101514] to-[#151c1a]">
        
        {/* Intro Banner */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden relative border border-white/5 flex flex-col items-center justify-center p-6 text-center shadow-lg bg-black">
          <video
            src={projects[0].videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
          />
          <div className="relative z-10 space-y-2">
            <span className="font-space text-[10px] tracking-[0.25em] text-brand-teal font-bold uppercase block">
              STUDIO PORTFOLIO
            </span>
            <h2 className="font-sora text-3xl font-extrabold text-white">
              FIRST LOOK
            </h2>
            <p className="font-sans text-brand-linen/75 text-xs font-light max-w-xs mx-auto">
              All visual works below are <strong className="text-brand-teal font-semibold">100% AI-generated</strong>. Crafted with <span className="text-white font-medium">no physical production setup</span>.
            </p>
          </div>
        </div>

        {/* Sequential List */}
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col gap-5 pt-4">
            {/* Video Container */}
            <div className="w-full aspect-video bg-black/45 rounded-2xl border border-white/5 overflow-hidden relative shadow-md">
              <video
                src={project.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-0.5 rounded-full text-[9px] font-space tracking-wider text-white/90 uppercase font-bold">
                Project {project.id}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 px-1">
              <span className="font-space text-[10px] tracking-widest text-brand-teal font-extrabold uppercase">
                {project.tag}
              </span>
              <h3 className="font-sora text-xl font-bold text-white leading-tight">
                {project.title}
              </h3>
              <p className="font-sans text-brand-linen/75 text-sm font-light leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
