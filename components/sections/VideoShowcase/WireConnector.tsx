'use client';

import React from 'react';
import { motion, useTransform } from 'framer-motion';
import type { WireConnectorProps } from './types';

/**
 * SVG vertical wire connecting thumbnail nodes on the left panel.
 * Animated pulse dot travels along the wire driven by scroll progress.
 */
export function WireConnector({ nodeCount, isActive, scrollProgress }: WireConnectorProps) {
  const spacing = 100 / (nodeCount + 1);
  const nodePositions = Array.from({ length: nodeCount }, (_, i) => (i + 1) * spacing);

  // Pulse dot travels top→bottom as scroll progresses within this video segment
  const pulseY = useTransform(scrollProgress, [0, 1], [nodePositions[0], nodePositions[nodeCount - 1]]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: 40, height: '100%' }}>
      <svg
        viewBox="0 0 40 100"
        preserveAspectRatio="none"
        className="wire-svg"
        style={{ width: 40, height: '100%' }}
      >
        {/* Main vertical wire line */}
        <line
          x1="20"
          y1={`${nodePositions[0]}%`}
          x2="20"
          y2={`${nodePositions[nodeCount - 1]}%`}
          className={`wire-line ${isActive ? 'wire-line--active' : ''}`}
          strokeDasharray="4 4"
        />

        {/* Node circles at each thumbnail junction */}
        {nodePositions.map((yPercent, i) => (
          <circle
            key={i}
            cx="20"
            cy={`${yPercent}%`}
            r={isActive ? 5 : 3}
            className={`wire-node ${isActive ? 'wire-node--active' : ''}`}
            opacity={isActive ? 1 : 0.35}
          />
        ))}

        {/* Connecting horizontal stubs to thumbnails (left side) */}
        {nodePositions.map((yPercent, i) => (
          <line
            key={`stub-${i}`}
            x1="0"
            y1={`${yPercent}%`}
            x2="15"
            y2={`${yPercent}%`}
            className={`wire-line ${isActive ? 'wire-line--active' : ''}`}
            strokeDasharray="none"
          />
        ))}
      </svg>

      {/* Animated pulse dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: 10,
          height: 10,
          top: useTransform(pulseY, (v) => `${v}%`),
          backgroundColor: '#256951',
          boxShadow: isActive
            ? '0 0 12px rgba(37, 105, 81, 0.7)'
            : '0 0 4px rgba(37, 105, 81, 0.3)',
          opacity: isActive ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      />
    </div>
  );
}
