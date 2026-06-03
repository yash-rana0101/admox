'use client';

import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { WebGLCanvas } from '../components/webgl/WebGLCanvas';
import { Hero } from '../components/sections/Hero';
import { TrustBar } from '../components/sections/TrustBar';
import { Services } from '../components/sections/Services';
import { Pillars } from '../components/sections/Pillars';
import { Manifesto } from '../components/sections/Manifesto';
import { WhoWeServe } from '../components/sections/WhoWeServe';
import { CTA } from '../components/sections/CTA';

export default function Home() {
  return (
    <div className="relative min-h-screen text-brand-onyx selection:bg-brand-teal selection:text-white flex flex-col">
      {/* 3D WebGL Canvas fixed in the background */}
      <WebGLCanvas />

      {/* Navigation Header */}
      <Navbar />

      {/* Sections Wrapper */}
      <main className="flex-1 flex flex-col relative z-20">
        <Hero />
        <TrustBar />
        <Services />
        <Pillars />
        <Manifesto />
        <WhoWeServe />
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
