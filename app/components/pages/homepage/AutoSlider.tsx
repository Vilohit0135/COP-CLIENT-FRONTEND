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

  useEffect(() => {
    if (count === 0) return;
    const id = setInterval(() => {
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
