'use client';

import React from 'react';
import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { FrameConfig, PARALLAX_RANGES, LAYOUT_H, CONVERGE } from './constants';

interface WirePathProps {
  frame: FrameConfig;
  index: number;
  scrollProgress: MotionValue<number>;
  dragX: MotionValue<number>;
  dragY: MotionValue<number>;
  containerW: number;
  containerH: number;
  videoDragX: MotionValue<number>;
  videoDragY: MotionValue<number>;
}

export function WirePath({
  frame,
  index,
  scrollProgress,
  dragX,
  dragY,
  containerW,
  containerH,
  videoDragX,
  videoDragY,
}: WirePathProps) {
  const range = PARALLAX_RANGES[index];
  const a = {
    x: (frame.left + frame.w) * 10,
    y: (frame.top + frame.h / 2) * 6,
  };

  const dynamicCoord = useTransform(
    [scrollProgress, dragX, dragY, videoDragX, videoDragY],
    (latest: unknown) => {
      const [progress, dx, dy, vdx, vdy] = latest as [number, number, number, number, number];
      const currentOffset = range.start + progress * (range.end - range.start);
      const frameTop = frame.top + currentOffset;

      const cardWidth = frame.w * 10;
      const cardHeight = (containerW / containerH) * frame.w * 3.375;
      const cardLeft = frame.left * 10 + (dx / containerW) * 1000;
      const cardTop = (frameTop * 6) + (dy / containerH) * 600;
      const cardCenterX = cardLeft + cardWidth / 2;
      const cardCenterY = cardTop + cardHeight / 2;

      const videoWidth = 520;
      const videoHeight = 200;
      const videoLeft = 470 + (vdx / containerW) * 1000;
      const videoTop = 200 + (vdy / containerH) * 600;
      const videoCenterX = videoLeft + videoWidth / 2;
      const videoCenterY = videoTop + videoHeight / 2;

      const vectorX = videoCenterX - cardCenterX;
      const vectorY = videoCenterY - cardCenterY;

      let x = 0;
      let y = 0;
      let vx = 0;
      let vy = 0;
      let isHorizontal = true;

      if (Math.abs(vectorX) > Math.abs(vectorY)) {
        isHorizontal = true;
        if (vectorX > 0) {
          x = cardLeft + cardWidth;
          y = cardCenterY;
          vx = videoLeft;
          vy = videoCenterY;
        } else {
          x = cardLeft;
          y = cardCenterY;
          vx = videoLeft + videoWidth;
          vy = videoCenterY;
        }
      } else {
        isHorizontal = false;
        if (vectorY > 0) {
          x = cardCenterX;
          y = cardTop + cardHeight;
          vx = videoCenterX;
          vy = videoTop;
        } else {
          x = cardCenterX;
          y = cardTop;
          vx = videoCenterX;
          vy = videoTop + videoHeight;
        }
      }

      return { x, y, vx, vy, isHorizontal };
    }
  );

  const dVal = useTransform(dynamicCoord, (coord: unknown) => {
    const { x, y, vx, vy, isHorizontal } = coord as {
      x: number;
      y: number;
      vx: number;
      vy: number;
      isHorizontal: boolean;
    };
    if (isHorizontal) {
      const cp1x = x + (vx - x) * 0.55;
      const cp2x = x + (vx - x) * 0.75;
      return `M ${x} ${y} C ${cp1x} ${y}, ${cp2x} ${vy}, ${vx} ${vy}`;
    } else {
      const cp1y = y + (vy - y) * 0.55;
      const cp2y = y + (vy - y) * 0.75;
      return `M ${x} ${y} C ${x} ${cp1y}, ${vx} ${cp2y}, ${vx} ${vy}`;
    }
  });

  const rectXVal = useTransform(dynamicCoord, (coord: unknown) => (coord as { x: number }).x - 5);
  const rectYVal = useTransform(dynamicCoord, (coord: unknown) => (coord as { y: number }).y - 5);

  const videoRectXVal = useTransform(dynamicCoord, (coord: unknown) => (coord as { vx: number }).vx - 5);
  const videoRectYVal = useTransform(dynamicCoord, (coord: unknown) => (coord as { vy: number }).vy - 5);

  return (
    <g>
      <motion.path d={dVal} className="wire-path" />
      <motion.rect
        x={rectXVal}
        y={rectYVal}
        width={10}
        height={10}
        rx={2}
        className="wire-node"
      />
      <motion.rect
        x={videoRectXVal}
        y={videoRectYVal}
        width={10}
        height={10}
        rx={2}
        className="wire-node wire-node--main"
      />
    </g>
  );
}
