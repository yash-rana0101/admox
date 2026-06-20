'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LogoCard } from '../../ui/LogoCard';
import { useLogos } from '../../../hooks/useLogos';

export function LogoArc() {
  const { logos, isLoading } = useLogos();

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

  if (isLoading || !logos || logos.length === 0) {
    return <div className="absolute inset-0 pointer-events-none z-10" />;
  }

  // Sort logos alphabetically to ensure deterministic layout order
  const sortedLogos = [...logos].sort((a, b) => a.localeCompare(b));
  const N = sortedLogos.length;

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {sortedLogos.map((filename, i) => {
        // Calculate dynamic spacing and curve coordinates
        // Map logos along the upper arc of the circle (from 158 degrees to 22 degrees)
        const t = N > 1 ? i / (N - 1) : 0.5;
        
        // Start angle (leftmost): 158 degrees, End angle (rightmost): 22 degrees
        const startAngle = (158 * Math.PI) / 180;
        const endAngle = (22 * Math.PI) / 180;
        
        const theta = startAngle + t * (endAngle - startAngle);
        
        // The dome container is aspect-square and rounded-full (perfect circle).
        // Center is at (50%, 50%), radius is 50%.
        const R = 50;
        const leftPercent = 50 + R * Math.cos(theta);
        const topPercent = 50 - R * Math.sin(theta);
        
        // Rotate the cards gently to follow the tangent of the circular arc.
        const angleDeg = (theta * 180) / Math.PI;
        const rotateDeg = (90 - angleDeg) * 0.35;
        
        // Delay wave pattern: outer float first, then inner, then center
        const u = N > 1 ? (2 * i) / (N - 1) - 1 : 0;
        const delay = (1 - Math.abs(u)) * 0.8;

        const cleanName = filename
          .replace(/\.[^/.]+$/, "") // Remove extension
          .replace(/[_-]/g, " ");   // Replace dashes/underscores with spaces

        return (
          <motion.div
            key={filename}
            {...floatTransition(delay)}
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <LogoCard
              style={{ transform: `rotate(${rotateDeg}deg)` }}
            >
              {/* Render dynamic SVG logo from public folder */}
              <img
                src={`/logos/${filename}`}
                alt={cleanName}
                className="w-full h-full object-contain pointer-events-none select-none"
              />
            </LogoCard>
          </motion.div>
        );
      })}
    </div>
  );
}

export default LogoArc;
