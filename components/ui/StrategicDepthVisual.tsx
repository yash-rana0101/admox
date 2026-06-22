"use client";

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export function StrategicDepthVisual() {
  const ringsRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // 1. Sonar rings scaling out
    const rings = ringsRef.current?.querySelectorAll('.sonar-ring');
    if (rings && rings.length > 0) {
      animate(rings, {
        scale: [0.3, 1.3],
        opacity: [0.9, 0],
        duration: 2500,
        delay: (el: any, i: number) => i * 800,
        loop: true,
        easing: 'easeOutQuad',
      });
    }

    // 2. Radar sweep line rotation
    if (sweepRef.current) {
      animate(sweepRef.current, {
        rotate: 360,
        duration: 3500,
        easing: 'linear',
        loop: true,
      });
    }
  }, []);

  return (
    <div className="relative w-full h-[120px] flex items-center justify-center bg-black/20 rounded-lg border border-white/[0.04] overflow-hidden">
      {/* Concentric Sonar Rings */}
      <div ref={ringsRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="sonar-ring absolute rounded-full border border-brand-teal/30 w-24 h-24 shadow-[0_0_15px_rgba(37,105,81,0.1)]"
            style={{ transform: 'scale(0)' }}
          />
        ))}
      </div>

      {/* Radar Overlay SVG */}
      <svg className="w-28 h-28 pointer-events-none relative z-10" viewBox="0 0 100 100">
        {/* Crosshair Lines */}
        <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(37, 105, 81, 0.15)" strokeWidth="1" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(37, 105, 81, 0.15)" strokeWidth="1" />
        
        {/* Rotating sweep line */}
        <g ref={sweepRef} style={{ transformOrigin: '50px 50px' }}>
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="12"
            stroke="#256951"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="shadow-[0_0_10px_#256951]"
          />
          {/* Sweeper glow gradient path */}
          <path
            d="M 50 50 L 50 12 A 38 38 0 0 1 82 72 Z"
            fill="url(#sweeper-glow)"
            opacity="0.25"
          />
        </g>

        {/* Center Target Dot */}
        <circle cx="50" cy="50" r="3" fill="#D4E8CC" className="shadow-[0_0_8px_#D4E8CC]" />

        <defs>
          <linearGradient id="sweeper-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#256951" stopOpacity="0" />
            <stop offset="100%" stopColor="#256951" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
