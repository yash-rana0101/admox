"use client";

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export function AuthenticImpactVisual() {
  const barsRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // 1. Staggered bar charts scaling up
    const bars = barsRef.current?.querySelectorAll('.chart-bar');
    if (bars && bars.length > 0) {
      animate(bars, {
        scaleY: [0.1, 1],
        duration: 1000,
        delay: (el: any, i: number) => i * 120,
        easing: 'easeOutElastic(1, 0.7)',
        loop: true,
        direction: 'alternate',
      });
    }

    // 2. Line trend drawing animation
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength() || 300;
      pathRef.current.setAttribute('stroke-dasharray', String(pathLength));
      pathRef.current.setAttribute('stroke-dashoffset', String(pathLength));

      animate(pathRef.current, {
        strokeDashoffset: [pathLength, 0],
        duration: 2500,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate',
      });
    }

    // 3. Dot following the line path (approximate slide animation)
    if (dotRef.current) {
      animate(dotRef.current, {
        cx: [20, 160],
        cy: [85, 30],
        opacity: [0, 1, 0],
        duration: 2500,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate',
      });
    }
  }, []);

  return (
    <div className="relative w-full h-[120px] flex items-end justify-center bg-black/20 rounded-lg border border-white/[0.04] p-4 overflow-hidden">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#256951_1px,transparent_1px),linear-gradient(to_bottom,#256951_1px,transparent_1px)] bg-[size:20px_14px] pointer-events-none" />

      {/* Bar Chart Grid */}
      <div ref={barsRef} className="absolute inset-x-6 bottom-4 flex items-end justify-between h-[65px] pointer-events-none z-0">
        {[20, 45, 35, 60, 50, 75, 65, 85, 95].map((height, i) => (
          <div
            key={i}
            className="chart-bar w-[6%] bg-gradient-to-t from-brand-teal/20 to-brand-teal/70 rounded-t"
            style={{ height: `${height}%`, transformOrigin: 'bottom center', transform: 'scaleY(0.1)' }}
          />
        ))}
      </div>

      {/* Overlapping Trend SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 180 100">
        {/* Trend Line Path */}
        <path
          ref={pathRef}
          d="M 20 85 Q 50 80 80 55 T 160 30"
          fill="none"
          stroke="#D4E8CC"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Dynamic Dot cursor */}
        <circle
          ref={dotRef}
          cx="20"
          cy="85"
          r="4.5"
          fill="#256951"
          stroke="#D4E8CC"
          strokeWidth="1.5"
          className="shadow-[0_0_8px_#D4E8CC]"
        />
      </svg>
    </div>
  );
}
