'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AutoSliderProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** px to advance per step (card width + gap). Default 197 */
  cardWidth?: number;
  /** ms between auto-slides. Default 3200 */
  interval?: number;
}

/**
 * Smooth CSS-transform based card slider.
 * Clones the first few items for seamless infinite loop.
 */
export default function AutoSlider({
  children,
  className = '',
  style,
  cardWidth = 197,
  interval = 3200,
}: AutoSliderProps) {
  const items = React.Children.toArray(children);
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const indexRef = useRef(0);

  // touch swipe support
  const touchStartXRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const delta = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 30) {
      if (delta > 0) {
        const next = indexRef.current + 1;
        indexRef.current = next;
        setAnimate(true);
        setIndex(next);
      } else {
        const prev = Math.max(0, indexRef.current - 1);
        indexRef.current = prev;
        setAnimate(true);
        setIndex(prev);
      }
    }
    touchStartXRef.current = null;
    isPausedRef.current = false;
  };

  useEffect(() => {
    if (count === 0) return;
    const id = setInterval(() => {
      if (isPausedRef.current) return;
      const next = indexRef.current + 1;
      indexRef.current = next;
      setAnimate(true);
      setIndex(next);
    }, interval);
    return () => clearInterval(id);
  }, [interval, count]);

  const handleTransitionEnd = () => {
    if (indexRef.current >= count) {
      // snapped into clone zone — jump back to real item 0 instantly
      indexRef.current = 0;
      setAnimate(false);
      setIndex(0);
    } else {
      setAnimate(false);
    }
  };

  const cloneCount = Math.min(3, count);
  const clones = items.slice(0, cloneCount).map((child, i) =>
    React.cloneElement(child as React.ReactElement, { key: `__clone_${i}` })
  );
  const all = [...items, ...clones];

  return (
    <div
      className={`overflow-hidden pb-4 ${className}`}
      style={style}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          display: 'flex',
          gap: 8,
          transform: `translateX(-${index * cardWidth}px)`,
          transition: animate ? 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          willChange: 'transform',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {all}
      </div>
    </div>
  );
}
