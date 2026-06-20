'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LogoCard } from '../../ui/LogoCard';

export function LogoArc() {
  const floatTransition = (delay: number) => ({
    animate: { y: [0, -8, 0] },
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
      delay: delay
    }
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* 1. Higgsfield (Leftmost, Outer) */}
      <motion.div
        {...floatTransition(0)}
        className="absolute left-[6%] top-[54%] -translate-x-1/2 -translate-y-1/2"
      >
        <LogoCard className="rotate-[-12deg]">
          {/* Higgsfield Custom SVG */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="24" height="24" rx="5" fill="#000000" />
            <path
              d="M7 6v12M17 6v12M7 12h10"
              stroke="#C0FF00"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
          </svg>
        </LogoCard>
      </motion.div>

      {/* 2. After Effects (Left-center) */}
      <motion.div
        {...floatTransition(0.5)}
        className="absolute left-[24%] top-[18%] -translate-x-1/2 -translate-y-1/2"
      >
        <LogoCard className="rotate-[-6deg]">
          {/* After Effects SVG */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="24" height="24" rx="5" fill="#031626" stroke="#1890FF" strokeWidth="0.75" />
            <text
              x="12"
              y="15.5"
              fill="#38BDF8"
              fontSize="10"
              fontWeight="bold"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              Ae
            </text>
          </svg>
        </LogoCard>
      </motion.div>

      {/* 3. Gemini (Center-top) */}
      <motion.div
        {...floatTransition(1)}
        className="absolute left-1/2 top-[2%] -translate-x-1/2 -translate-y-1/2"
      >
        <LogoCard className="rotate-[0deg]">
          {/* Gemini SVG */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z"
              fill="url(#gemini-arc-gradient)"
            />
            <defs>
              <linearGradient id="gemini-arc-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="9%" stopColor="#4285F4" />
                <stop offset="45%" stopColor="#9B51E0" />
                <stop offset="83%" stopColor="#E9446A" />
                <stop offset="95%" stopColor="#F2994A" />
              </linearGradient>
            </defs>
          </svg>
        </LogoCard>
      </motion.div>

      {/* 4. Photoshop (Right-center) */}
      <motion.div
        {...floatTransition(0.7)}
        className="absolute left-[76%] top-[18%] -translate-x-1/2 -translate-y-1/2"
      >
        <LogoCard className="rotate-[6deg]">
          {/* Photoshop SVG */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="24" height="24" rx="5" fill="#011826" stroke="#00A3FF" strokeWidth="0.75" />
            <text
              x="12"
              y="15.5"
              fill="#00C2FF"
              fontSize="10"
              fontWeight="bold"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              Ps
            </text>
          </svg>
        </LogoCard>
      </motion.div>

      {/* 5. Premiere Pro (Rightmost, Outer) */}
      <motion.div
        {...floatTransition(0.2)}
        className="absolute left-[94%] top-[54%] -translate-x-1/2 -translate-y-1/2"
      >
        <LogoCard className="rotate-[12deg]">
          {/* Premiere Pro SVG */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="24" height="24" rx="5" fill="#1b122c" stroke="#9d50f7" strokeWidth="0.75" />
            <text
              x="12"
              y="15.5"
              fill="#e0a3ff"
              fontSize="10"
              fontWeight="bold"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              Pr
            </text>
          </svg>
        </LogoCard>
      </motion.div>
    </div>
  );
}

export default LogoArc;
