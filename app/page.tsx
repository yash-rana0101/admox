'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { VideoShowcase } from '../components/sections/VideoShowcase';
import { TrustBar } from '../components/sections/TrustBar';
import { Services } from '../components/sections/Services';
import { ReelsShowcase } from '../components/sections/ReelsShowcase';
import { Pillars } from '../components/sections/Pillars';
import { Manifesto } from '../components/sections/Manifesto';
import { Testimonials } from '../components/sections/Testimonials';
import { WhoWeServe } from '../components/sections/WhoWeServe';
import { CTA } from '../components/sections/CTA';
import { EntryScreen } from '../components/layout/EntryScreen';

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="relative min-h-screen text-brand-onyx selection:bg-brand-teal selection:text-white flex flex-col">
      {/* Splash Entry Screen */}
      {showSplash && (
        <EntryScreen
          onStartEnter={() => setIsEntering(true)}
          onComplete={() => {
            setShowSplash(false);
            setHasEntered(true);
          }}
        />
      )}

      
      {/* Main Website Wrapper with premium scale & fade reveal */}
      <motion.div
        className="min-h-screen flex flex-col relative w-full"
        initial={hasEntered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        animate={{
          opacity: hasEntered || isEntering ? 1 : 0,
          scale: hasEntered || isEntering ? 1 : 0.98,
        }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Navigation Header */}
        <Navbar />

        {/* Sections Wrapper */}
        <main className="flex-1 flex flex-col relative z-20">
          <Hero />
          <VideoShowcase />
          <TrustBar />
          <Services />
          <ReelsShowcase />
          <Pillars />
          <Manifesto />
          <Testimonials />
          <WhoWeServe />
          <CTA />
        </main>
        
        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
}
