'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export default function ChromaGrid({
  items = [],
  className = '',
  radius = 220,
  columns = 2,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
}) {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);

  const positionRef = useRef({
    x: 0,
    y: 0,
  });

  const setterXRef = useRef(null);
  const setterYRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    setterXRef.current = gsap.quickSetter(
      root,
      '--x',
      'px'
    );

    setterYRef.current = gsap.quickSetter(
      root,
      '--y',
      'px'
    );

    const rect = root.getBoundingClientRect();

    positionRef.current.x = rect.width / 2;
    positionRef.current.y = rect.height / 2;

    setterXRef.current(positionRef.current.x);
    setterYRef.current(positionRef.current.y);

    return () => {
      gsap.killTweensOf(positionRef.current);
    };
  }, []);

  const moveTo = (x, y) => {
    gsap.to(positionRef.current, {
      x,
      y,
      duration: damping,
      ease,
      overwrite: true,

      onUpdate: () => {
        setterXRef.current?.(positionRef.current.x);
        setterYRef.current?.(positionRef.current.y);
      },
    });
  };

  const handlePointerMove = (event) => {
    const root = rootRef.current;

    if (!root) return;

    const rect = root.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    moveTo(x, y);

    if (fadeRef.current) {
      gsap.to(fadeRef.current, {
        opacity: 0,
        duration: 0.25,
        overwrite: true,
      });
    }
  };

  const handlePointerLeave = () => {
    if (!fadeRef.current) return;

    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty(
      '--mouse-x',
      `${x}px`
    );

    card.style.setProperty(
      '--mouse-y',
      `${y}px`
    );
  };

  const handleCardClick = (url) => {
    if (!url) return;

    if (url.startsWith('mailto:')) {
      window.location.href = url;
      return;
    }

    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{
        '--r': `${radius}px`,
        '--cols': columns,
        '--rows': rows,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {items.map((item, index) => (
        <article
          key={`${item.label}-${index}`}
          className="chroma-card chroma-card--logo"
          style={{
            '--card-border':
              item.borderColor ||
              'rgba(148, 163, 184, 0.45)',
          }}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(item.url)}
          role={item.url ? 'link' : undefined}
          tabIndex={item.url ? 0 : undefined}
          onKeyDown={(event) => {
            if (
              item.url &&
              (event.key === 'Enter' ||
                event.key === ' ')
            ) {
              event.preventDefault();
              handleCardClick(item.url);
            }
          }}
        >
          <div className="chroma-logo">
            {item.icon}
          </div>

          <span className="chroma-number">
            0{index + 1}
          </span>
        </article>
      ))}

      <div className="chroma-overlay" />

      <div
        ref={fadeRef}
        className="chroma-fade"
      />
    </div>
  );
}