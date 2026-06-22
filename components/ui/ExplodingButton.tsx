"use client";

import React, { useRef } from 'react';
import { animate } from 'animejs';
import { Button } from './Button';

interface ExplodingButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: (e?: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function ExplodingButton({
  children,
  onClick,
  ...props
}: ExplodingButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const count = 18;
    const colors = ['#256951', '#D4E8CC', '#FFFFFF'];

    // Generate burst particles inside the overlay container
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 40 + Math.random() * 60;
      const size = 3 + Math.random() * 4;
      const color = colors[Math.floor(Math.random() * colors.length)];

      const el = document.createElement('span');
      el.className = 'absolute rounded-full pointer-events-none z-50';
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.backgroundColor = color;
      
      containerRef.current?.appendChild(el);

      animate(el, {
        translateX: Math.cos(angle) * velocity,
        translateY: Math.sin(angle) * velocity,
        scale: [1, 0],
        opacity: [1, 0],
        duration: 500 + Math.random() * 500,
        easing: 'easeOutQuad',
        onComplete: () => {
          el.remove();
        },
      });
    }
  };

  return (
    <div ref={containerRef} className="relative inline-block overflow-visible">
      {/* Set override styling to allow visible overflow particles */}
      <Button
        onClick={handleClick as any}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
}
