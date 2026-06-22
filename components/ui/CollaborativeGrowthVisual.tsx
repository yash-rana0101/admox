"use client";

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export function CollaborativeGrowthVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGLineElement>(null);
  const path2Ref = useRef<SVGLineElement>(null);
  const path3Ref = useRef<SVGLineElement>(null);

  const avatars = [
    { name: 'Sarah', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80', style: 'left-[22%] top-[25%]' },
    { name: 'Alex', src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80&q=80', style: 'right-[22%] top-[25%]' },
    { name: 'Dan', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80', style: 'left-[50%] bottom-[12%] -translate-x-1/2' },
  ];

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll('.avatar-node');
    if (nodes && nodes.length > 0) {
      // 1. Staggered node pulses
      animate(nodes, {
        scale: [0.9, 1.1, 1],
        opacity: [0.8, 1],
        duration: 1200,
        delay: (el: any, i: number) => i * 400,
        loop: true,
        direction: 'alternate',
        easing: 'easeOutBack',
      });
    }

    // 2. Dashoffset line animations showing active communication
    const lines = [path1Ref.current, path2Ref.current, path3Ref.current];
    lines.forEach((line, idx) => {
      if (line) {
        line.setAttribute('stroke-dasharray', '8, 8');
        animate(line, {
          strokeDashoffset: [32, 0],
          duration: 1200,
          delay: idx * 300,
          loop: true,
          easing: 'linear',
        });
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[120px] bg-black/20 rounded-lg border border-white/[0.04] overflow-hidden">
      {/* Dynamic network lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        {/* Line 1: Sarah (22% x, 25% y) to Alex (78% x, 25% y) */}
        <line
          ref={path1Ref}
          x1="28%"
          y1="38%"
          x2="72%"
          y2="38%"
          stroke="#256951"
          strokeWidth="1.5"
          opacity="0.6"
        />
        {/* Line 2: Sarah (28% x, 38% y) to Dan (50% x, 73% y) */}
        <line
          ref={path2Ref}
          x1="28%"
          y1="38%"
          x2="50%"
          y2="73%"
          stroke="#256951"
          strokeWidth="1.5"
          opacity="0.6"
        />
        {/* Line 3: Alex (72% x, 38% y) to Dan (50% x, 73% y) */}
        <line
          ref={path3Ref}
          x1="72%"
          y1="38%"
          x2="50%"
          y2="73%"
          stroke="#256951"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>

      {/* Floating Avatar Nodes */}
      {avatars.map((avatar, idx) => (
        <div
          key={avatar.name}
          className={`avatar-node absolute flex flex-col items-center justify-center pointer-events-none z-10 ${avatar.style}`}
          style={{ transformOrigin: 'center center' }}
        >
          {/* Avatar Container with pulse */}
          <div className="relative w-8 h-8 rounded-full border-2 border-brand-teal/80 bg-brand-onyx overflow-hidden shadow-lg shadow-brand-teal/20">
            <img
              src={avatar.src}
              alt={avatar.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Subtle name badge underneath */}
          <span className="font-space text-[7px] uppercase tracking-wider text-brand-subtle mt-1 block select-none bg-black/40 px-1 rounded">
            {avatar.name}
          </span>
        </div>
      ))}
    </div>
  );
}
