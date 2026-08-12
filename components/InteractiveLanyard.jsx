'use client';

import Image from 'next/image';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { useEffect, useRef, useState, useId } from 'react';

const FOLLOW_SPRING = { damping: 16, stiffness: 235, mass: 0.45 };
const SWING_SPRING = { damping: 13, stiffness: 90, mass: 0.9 };

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

export default function InteractiveLanyard() {
  const boundsRef = useRef(null);
  const dragRef = useRef(null);
  const returnAnimations = useRef([]);
  const [size, setSize] = useState({ width: 390, height: 630 });
  const [isDragging, setIsDragging] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const gradientId = useId().replace(/:/g, '');
  const shadowId = useId().replace(/:/g, '');

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const hoverX = useSpring(0, FOLLOW_SPRING);
  const hoverY = useSpring(0, FOLLOW_SPRING);
  const tiltX = useSpring(0, FOLLOW_SPRING);
  const tiltY = useSpring(0, FOLLOW_SPRING);
  const cardScale = useSpring(1, { damping: 18, stiffness: 260, mass: 0.35 });
  const velocityX = useVelocity(dragX);

  const cardX = useTransform([dragX, hoverX], ([drag, hover]) => drag + hover);
  const cardY = useTransform([dragY, hoverY], ([drag, hover]) => drag + hover);
  const offsetSwing = useSpring(
    useTransform(cardX, (x) => clamp(x * 0.042, -9, 9)),
    SWING_SPRING
  );
  const velocitySwing = useSpring(
    useTransform(velocityX, (velocity) => clamp(velocity * 0.009, -13, 13)),
    { damping: 15, stiffness: 105, mass: 0.75 }
  );
  const cardRotation = useTransform(
    [offsetSwing, velocitySwing],
    ([offset, velocity]) => offset + velocity
  );
  const reflectionX = useTransform(tiltY, [-5.5, 5.5], [-12, 12]);

  useEffect(() => {
    const element = boundsRef.current;
    if (!element) return undefined;

    const updateSize = () => {
      const { width, height } = element.getBoundingClientRect();
      if (width && height) setSize({ width, height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => returnAnimations.current.forEach((animation) => animation.stop()), []);

  const cardTop = size.height * 0.3;
  const anchorX = size.width / 2;
  const anchorY = Math.max(18, size.height * 0.06);

  const ropePath = useTransform([cardX, cardY, velocityX], ([x, y, velocity]) => {
    const endX = anchorX + x;
    const endY = cardTop + y - 10;
    const distanceX = endX - anchorX;
    const span = Math.max(48, endY - anchorY);
    const velocityBend = clamp(velocity * 0.008, -20, 20);
    const sag = Math.min(58, 15 + Math.abs(distanceX) * 0.2 + Math.abs(velocityBend) * 0.45);
    const controlOneX = anchorX + distanceX * 0.08 - velocityBend * 0.18;
    const controlTwoX = endX - distanceX * 0.2 - velocityBend;

    return `M ${anchorX} ${anchorY} C ${controlOneX} ${anchorY + span * 0.28 + sag}, ${controlTwoX} ${endY - span * 0.23 + sag * 0.2}, ${endX} ${endY}`;
  });

  const clearReturnAnimations = () => {
    returnAnimations.current.forEach((animation) => animation.stop());
    returnAnimations.current = [];
  };

  const resetHover = () => {
    hoverX.set(0);
    hoverY.set(0);
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleContainerPointerMove = (event) => {
    if (shouldReduceMotion || dragRef.current || event.pointerType !== 'mouse') return;
    const bounds = boundsRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const horizontal = clamp((event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2), -1, 1);
    const vertical = clamp((event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2), -1, 1);
    hoverX.set(horizontal * Math.min(11, bounds.width * 0.035));
    hoverY.set(vertical * Math.min(7, bounds.height * 0.014));
    tiltX.set(-vertical * 4.5);
    tiltY.set(horizontal * 5.5);
  };

  const handlePointerDown = (event) => {
    if (shouldReduceMotion) return;
    if (event.pointerType === 'mouse') event.preventDefault();

    clearReturnAnimations();
    resetHover();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: dragX.get(),
      originY: dragY.get(),
      lastX: dragX.get(),
      lastY: dragY.get(),
      lastTime: performance.now(),
      velocityX: 0,
      velocityY: 0,
    };
    cardScale.set(1.025);
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const nextX = clamp(
      drag.originX + event.clientX - drag.startX,
      -size.width * 0.42,
      size.width * 0.42
    );
    const nextY = clamp(
      drag.originY + event.clientY - drag.startY,
      -size.height * 0.16,
      size.height * 0.28
    );
    const now = performance.now();
    const elapsed = Math.max(12, now - drag.lastTime);

    drag.velocityX = ((nextX - drag.lastX) / elapsed) * 1000;
    drag.velocityY = ((nextY - drag.lastY) / elapsed) * 1000;
    drag.lastX = nextX;
    drag.lastY = nextY;
    drag.lastTime = now;
    dragX.set(nextX);
    dragY.set(nextY);
  };

  const releaseCard = (event) => {
    const drag = dragRef.current;
    if (!drag || (event && drag.pointerId !== event.pointerId)) return;

    dragRef.current = null;
    cardScale.set(1);
    setIsDragging(false);
    returnAnimations.current = [
      animate(dragX, 0, {
        type: 'spring',
        stiffness: 70,
        damping: 11,
        mass: 1.15,
        velocity: shouldReduceMotion ? 0 : drag.velocityX,
      }),
      animate(dragY, 0, {
        type: 'spring',
        stiffness: 65,
        damping: 12,
        mass: 1.2,
        velocity: shouldReduceMotion ? 0 : drag.velocityY,
      }),
    ];
  };

  return (
    <div
      ref={boundsRef}
      className="relative h-full w-full select-none"
      role="group"
      aria-label="Kartu profil interaktif yang menggantung pada lanyard"
      onPointerMove={handleContainerPointerMove}
      onPointerLeave={() => !dragRef.current && resetHover()}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${size.width} ${size.height}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e7fffa" />
            <stop offset="44%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <filter id={shadowId} x="-50%" y="-25%" width="200%" height="170%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.55" />
          </filter>
        </defs>
        <circle cx={anchorX} cy={anchorY} r="9" fill="#06110f" stroke="#5eead4" strokeOpacity="0.8" strokeWidth="1.5" />
        <circle cx={anchorX} cy={anchorY} r="3" fill="#d8fffa" />
        <motion.path
          d={ropePath}
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeWidth="7"
          strokeOpacity="0.42"
          filter={`url(#${shadowId})`}
        />
        <motion.path
          d={ropePath}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[calc(30%_-_0.6rem)] z-10 h-5 w-5 -translate-x-1/2 rounded-full border border-teal-100/80 bg-[#07110f] shadow-[0_5px_13px_rgba(0,0,0,0.55)]"
        style={{ x: cardX, y: cardY }}
      >
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-200 shadow-[0_0_10px_rgba(94,234,212,0.8)]" />
      </motion.div>

      <motion.article
        className="absolute left-[14%] top-[30%] z-20 flex aspect-[0.68] w-[72%] cursor-grab touch-pan-y flex-col overflow-hidden rounded-[1.45rem] border border-white/20 bg-[#0a1715] p-2.5 text-white shadow-[0_30px_65px_-30px_rgba(0,0,0,0.95)] active:cursor-grabbing"
        style={{
          x: cardX,
          y: cardY,
          scale: cardScale,
          rotate: shouldReduceMotion ? 0 : cardRotation,
          rotateX: shouldReduceMotion ? 0 : tiltX,
          rotateY: shouldReduceMotion ? 0 : tiltY,
          transformPerspective: 900,
          transformOrigin: '50% 0%',
          touchAction: 'pan-y',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={releaseCard}
        onPointerCancel={releaseCard}
        aria-label="Kartu profil Hamdika Putra. Tarik kartu ini untuk mengayunkan lanyard."
      >
        <div className="relative aspect-[1.05] w-full overflow-hidden rounded-[1rem] bg-[#102722]">
          <Image
            src="/images/profile.jpg"
            alt="Hamdika Putra"
            fill
            sizes="(max-width: 767px) 155px, 270px"
            className="object-cover opacity-90 grayscale-[12%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#03100d]/70 via-transparent to-teal-100/20" />
          <div className="absolute -right-10 top-3 h-28 w-16 rotate-[28deg] bg-white/15 blur-xl" />
          <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[7px] font-bold tracking-[0.18em] text-teal-50 backdrop-blur-md sm:text-[8px]">
            PORTFOLIO / ID
          </span>
        </div>

        <div className="relative flex flex-1 flex-col justify-between px-1 pb-1 pt-3">
          <div>
            <p className="text-xs font-extrabold tracking-[-0.02em] sm:text-sm">Hamdika Putra</p>
            <p className="mt-1 max-w-[14rem] text-[8px] font-medium leading-relaxed text-teal-50/65 sm:text-[9px]">
              Big Data Analytics &amp; Machine Learning
            </p>
          </div>
          <div className="flex items-end justify-between border-t border-white/10 pt-2 text-[7px] font-semibold tracking-[0.14em] text-teal-100/70 sm:text-[8px]">
            <span>YOGYAKARTA</span>
            <span className="text-teal-200">01 / 01</span>
          </div>
          <div className="pointer-events-none absolute inset-x-2 bottom-1 h-8 rounded-full bg-teal-100/5 blur-xl" />
        </div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.45rem] bg-[linear-gradient(115deg,transparent_22%,rgba(255,255,255,0.14)_47%,transparent_66%)] mix-blend-screen"
          style={{ x: reflectionX }}
        />
        {isDragging && <span className="pointer-events-none absolute right-4 top-4 h-2 w-2 rounded-full bg-teal-200 shadow-[0_0_12px_rgba(94,234,212,0.9)]" />}
      </motion.article>
    </div>
  );
}
