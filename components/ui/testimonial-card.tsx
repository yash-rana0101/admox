"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Testimonial } from './stagger-testimonials.data';
import { animate } from 'animejs';

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
  dragOffset: number;
  isDragging: boolean;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
  dragOffset,
  isDragging
}) => {
  const isCenter = position === 0;
  const isMobileCard = cardSize < 320;
  const cardRef = useRef<HTMLDivElement>(null);

  // Mathematically scale the cut corner size and diagonal line width
  const cutSize = isMobileCard ? 35 : 50;
  const diagonalLength = Math.sqrt(2 * cutSize * cutSize);

  useEffect(() => {
    if (!cardRef.current) return;
    const targetX = (cardSize / 1.5) * position;
    const targetY = isCenter ? -65 : position % 2 ? 15 : -15;
    const targetRotate = isCenter ? 0 : position % 2 ? 2.5 : -2.5;

    animate(cardRef.current, {
      translateX: targetX,
      translateY: targetY,
      rotate: targetRotate,
      duration: 650,
      easing: 'easeOutElastic(1, .85)',
    });
  }, [position, cardSize, isCenter]);

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        width: cardSize,
        height: cardSize,
        zIndex: isCenter ? 10 : 0,
      }}
    >
      <div
        ref={cardRef}
        className="w-full h-full pointer-events-auto"
        onClick={() => {
          // Only trigger on-click navigation if the user isn't dragging
          if (dragOffset === 0) {
            handleMove(position);
          }
        }}
      >
        <div
          className={cn(
            "cursor-pointer border select-none h-full w-full transition-shadow duration-300",
            isCenter
              ? "bg-brand-teal text-white border-brand-teal shadow-xl"
              : "bg-white text-brand-onyx border-brand-subtle/40 hover:border-brand-teal/40 hover:shadow-lg",
            isMobileCard ? "p-5" : "p-8"
          )}
          style={{
            clipPath: `polygon(${cutSize}px 0%, calc(100% - ${cutSize}px) 0%, 100% ${cutSize}px, 100% 100%, calc(100% - ${cutSize}px) 100%, ${cutSize}px 100%, 0 100%, 0 0)`,
            boxShadow: isCenter ? "0px 8px 0px 4px var(--color-brand-subtle, #D4E8CC)" : "0px 0px 0px 0px transparent",
            transform: `translateX(${dragOffset}px)`,
            transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          <span
            className={cn(
              "absolute block origin-top-right rotate-45",
              isCenter ? "bg-white/20" : "bg-brand-subtle/30"
            )}
            style={{
              right: -2,
              top: cutSize - 2,
              width: diagonalLength,
              height: 2
            }}
          />

          <div className={cn("relative inline-block", isMobileCard ? "mb-4" : "mb-6")}>
            <img
              src={testimonial.imgSrc}
              alt={`${testimonial.by.split(',')[0]}`}
              className={cn(
                "object-cover object-top border border-brand-subtle/20",
                isMobileCard ? "h-11 w-10" : "h-14 w-12"
              )}
              style={{
                boxShadow: "3px 3px 0px var(--color-brand-linen, #EEF7E8)"
              }}
            />
          </div>

          <h3 className={cn(
            "leading-relaxed font-sora font-medium tracking-tight",
            isMobileCard ? "text-[13px] sm:text-[14px]" : "text-base sm:text-[17px]",
            isCenter ? "text-white" : "text-brand-onyx/90"
          )}>
            "{testimonial.testimonial}"
          </h3>

          <p className={cn(
            "absolute left-8 right-8 font-space uppercase tracking-widest font-bold",
            isMobileCard ? "bottom-5 text-[9px]" : "bottom-8 text-[10px]",
            isCenter ? "text-brand-subtle" : "text-brand-teal"
          )}
            style={{
              left: isMobileCard ? "20px" : "32px",
              right: isMobileCard ? "20px" : "32px"
            }}>
            — {testimonial.by}
          </p>
        </div>
      </div>
    </div>
  );
};
