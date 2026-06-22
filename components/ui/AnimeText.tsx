"use client";

import React, { useRef } from 'react';
import { useAnime } from '../../hooks/useAnime';

interface AnimeTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  splitBy?: 'chars' | 'words';
  delay?: number;
  duration?: number;
}

export function AnimeText({
  text,
  tag: Tag = 'span',
  className = '',
  splitBy = 'chars',
  delay = 0,
  duration = 800,
}: AnimeTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  // We split the text
  const items = splitBy === 'chars' ? text.split('') : text.split(' ');

  useAnime({
    targets: containerRef.current ? containerRef.current.querySelectorAll('.anime-item') : null,
    triggerOnView: true,
    animationProps: {
      translateY: ['105%', '0%'],
      opacity: [0, 1],
      rotateZ: [2, 0],
      delay: (el: any, i: number) => delay + i * (splitBy === 'chars' ? 20 : 60),
      duration: duration,
      easing: 'easeOutBack',
    },
  });

  return (
    <Tag
      ref={containerRef as any}
      className={`${className} inline-flex flex-wrap overflow-hidden`}
    >
      {items.map((item, idx) => (
        <span
          key={idx}
          className="anime-item inline-block"
          style={{ 
            transformOrigin: 'bottom center',
            marginRight: splitBy === 'words' && idx < items.length - 1 ? '0.27em' : undefined,
          }}
        >
          {item === ' ' ? '\u00A0' : item}
        </span>
      ))}
    </Tag>
  );
}

