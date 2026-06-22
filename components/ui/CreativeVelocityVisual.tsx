"use client";

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export function CreativeVelocityVisual() {
  const ringRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Odometer pulse
    if (textRef.current) {
      animate(textRef.current, {
        scale: [0.9, 1.1, 1],
        opacity: [0.7, 1],
        duration: 1200,
        easing: 'easeOutElastic(1, .6)',
        loop: true,
        direction: 'alternate',
      });
    }

    // 2. Dash ring rotation
    if (ringRef.current) {
      animate(ringRef.current, {
        strokeDashoffset: [400, 0],
        duration: 3000,
        easing: 'linear',
        loop: true,
      });
    }

    // 3. Spawning sparks flying outwards from the center
    const sparks = sparksRef.current?.querySelectorAll('.spark');
    if (sparks && sparks.length > 0) {
      animate(sparks, {
        translateX: () => (Math.random() - 0.5) * 120,
        translateY: () => (Math.random() - 0.5) * 120,
        scale: [0, 1, 0],
        opacity: [0, 0.8, 0],
        duration: () => 1000 + Math.random() * 800,
        delay: (el: any, i: number) => i * 150,
        loop: true,
        easing: 'easeOutQuad',
      });
    }
  }, []);

  return (
    <div className="relative w-full h-[120px] flex items-center justify-center bg-black/20 rounded-lg border border-white/[0.04] overflow-hidden">
      {/* Spark container */}
      <div ref={sparksRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="spark absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-brand-teal/80 shadow-[0_0_8px_#256951]"
            style={{ transform: 'translate(-50%, -50%)' }}
          />
        ))}
      </div>

      <svg className="w-28 h-28 transform -rotate-90 pointer-events-none" viewBox="0 0 120 120">
        {/* Background track circle */}
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="rgba(37, 105, 81, 0.1)"
          strokeWidth="4"
        />
        {/* Animated dashes circle */}
        <circle
          ref={ringRef}
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="url(#velocity-glow)"
          strokeWidth="3.5"
          strokeDasharray="15, 8"
        />
        <defs>
          <linearGradient id="velocity-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#256951" />
            <stop offset="100%" stopColor="#D4E8CC" />
          </linearGradient>
        </defs>
      </svg>

      {/* Central "5X" Odometer text */}
      <div 
        ref={textRef} 
        className="absolute font-sora text-4xl font-extrabold text-white tracking-tighter select-none z-10"
      >
        5<span className="text-brand-subtle">X</span>
      </div>
    </div>
  );
}
