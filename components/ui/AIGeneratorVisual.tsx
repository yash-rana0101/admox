"use client";

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { Sparkles, Play } from 'lucide-react';

export function AIGeneratorVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We will create 6 cards floating around a central AI orb
  const cards = [
    { id: 1, color: 'from-brand-teal via-emerald-800 to-brand-onyx', traj: { x: -75, y: -30, r: -15 } },
    { id: 2, color: 'from-emerald-700 via-teal-900 to-brand-onyx', traj: { x: 75, y: -30, r: 15 } },
    { id: 3, color: 'from-teal-600 via-brand-teal to-emerald-950', traj: { x: -95, y: 15, r: -25 } },
    { id: 4, color: 'from-emerald-800 via-brand-teal to-brand-onyx', traj: { x: 95, y: 15, r: 25 } },
    { id: 5, color: 'from-brand-teal via-teal-800 to-emerald-900', traj: { x: -55, y: 50, r: -10 } },
    { id: 6, color: 'from-emerald-700 via-emerald-900 to-brand-teal', traj: { x: 55, y: 50, r: 10 } },
  ];

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate each card elastically outwards from the center and float
    cards.forEach((card, idx) => {
      const el = cardRefs.current[idx];
      if (!el) return;

      animate(el, {
        keyframes: [
          // 1. Start: hidden in the center
          { translateX: 0, translateY: 0, scale: 0, opacity: 0, rotate: 0, duration: 0 },
          // 2. Expand outwards dynamically
          { 
            translateX: card.traj.x, 
            translateY: card.traj.y, 
            scale: 1, 
            opacity: 0.9, 
            rotate: card.traj.r, 
            duration: 900, 
            easing: 'easeOutElastic(1, .8)' 
          },
          // 3. Float upward/outward and fade away representing constant generation
          { 
            translateX: card.traj.x * 1.15, 
            translateY: card.traj.y - 30, 
            scale: 0.85, 
            opacity: 0, 
            rotate: card.traj.r * 1.25, 
            duration: 1500, 
            easing: 'easeOutQuad' 
          }
        ],
        delay: idx * 350,
        loop: true,
      });
    });
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[145px] flex items-center justify-center overflow-hidden bg-black/25 rounded-lg border border-white/[0.04]"
    >
      {/* Grid line background overlay */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#256951_1px,transparent_1px),linear-gradient(to_bottom,#256951_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Connection lines from center to outer positions (subtle SVGs) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        {cards.map((card) => (
          <line
            key={card.id}
            x1="50%"
            y1="50%"
            x2={`calc(50% + ${card.traj.x}px)`}
            y2={`calc(50% + ${card.traj.y}px)`}
            stroke="#256951"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
        ))}
      </svg>

      {/* Floating video/reel cards */}
      {cards.map((card, idx) => (
        <div
          key={card.id}
          ref={(el) => {
            cardRefs.current[idx] = el;
          }}
          className={`absolute w-[36px] h-[60px] rounded bg-gradient-to-br ${card.color} border border-brand-teal/40 p-1 flex flex-col justify-between shadow-lg pointer-events-none z-10`}
          style={{ transformOrigin: 'center center' }}
        >
          {/* Top segment representing video bar */}
          <div className="flex items-center justify-between">
            <span className="w-1 h-1 rounded-full bg-emerald-400 block animate-pulse" />
            <span className="w-3.5 h-0.5 bg-white/40 block" />
          </div>

          {/* Play button in center */}
          <div className="mx-auto flex items-center justify-center w-4.5 h-4.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <Play className="w-1.5 h-1.5 fill-white text-white translate-x-[0.5px]" />
          </div>

          {/* Bottom segment representing audio wave/handle */}
          <div className="space-y-0.5">
            <div className="w-full h-0.5 bg-white/30 rounded" />
            <div className="w-2/3 h-0.5 bg-brand-teal/40 rounded" />
          </div>
        </div>
      ))}

      {/* Central AI Generation Engine Orb */}
      <div className="relative w-12 h-12 rounded-full bg-brand-teal/15 border border-brand-teal/50 flex items-center justify-center text-brand-teal shadow-[0_0_25px_rgba(37,105,81,0.4)] backdrop-blur-md z-20">
        {/* Pulsing Outer Glows */}
        <div className="absolute inset-0 rounded-full border border-brand-teal/30 animate-ping opacity-60" />
        <div className="absolute -inset-1 rounded-full border border-brand-subtle/20 animate-pulse" />
        
        {/* Core Icon */}
        <Sparkles className="w-5 h-5 text-brand-subtle animate-spin" style={{ animationDuration: '6s' }} />
      </div>
    </div>
  );
}
