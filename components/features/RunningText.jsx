'use client';

import { useCallback, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function RunningText({
  textContent,
  speed = 150,
  direction = 'left',
  fontSizeClass = 'text-[12vw] md:text-[8vw]',
  accentOrbs = false,
}) {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const spanRef = useRef(null);
  const textContainerRef = useRef(null);

  const animateText = useCallback(() => {
    if (!textContainerRef.current || !spanRef.current) return;
    const distance = spanRef.current.offsetWidth + 20;
    if (!distance) return;
    controls.stop();
    controls.start({
      x: direction === 'right' ? [-distance, 0] : [0, -distance],
      transition: { x: { duration: distance / speed, ease: 'linear', repeat: Infinity, repeatType: 'loop' } },
    });
  }, [controls, direction, speed]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) animateText();
      else controls.stop();
    }, { threshold: 0.1 });
    const resizeObserver = new ResizeObserver(animateText);
    observer.observe(container);
    resizeObserver.observe(container);
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      controls.stop();
    };
  }, [animateText, controls]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden whitespace-nowrap bg-transparent py-0"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <motion.div ref={textContainerRef} className="flex flex-nowrap gap-5 whitespace-nowrap will-change-transform" animate={controls}>
        {Array.from({ length: 4 }, (_, index) => (
          <span
            key={`${textContent}-${index}`}
            ref={index === 0 ? spanRef : null}
            className={`running-text-content block ${fontSizeClass} cursor-default font-extrabold leading-[90%] tracking-[-0.07em] ${accentOrbs ? 'running-text-content--orbs' : 'text-primary-text'}`}
          >
            {textContent}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
