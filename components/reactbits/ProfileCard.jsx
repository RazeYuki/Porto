'use client';

import { useEffect, useRef } from 'react';
import './ProfileCard.css';

export default function ProfileCard({
  avatarUrl = '/images/profile.jpg',
  name = 'Hamdika Putra',
  title = 'Machine Learning / AI',
  handle = 'hmdkaptr_',
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  behindGlowEnabled = true,
  behindGlowColor = 'rgba(56, 189, 248, 0.45)',
  behindGlowSize = '60%',
  innerGradient = `
    linear-gradient(
      145deg,
      rgba(56,189,248,0.18) 0%,
      rgba(129,140,248,0.10) 45%,
      rgba(0,0,0,0) 100%
    )
  `,
  className = '',
}) {
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    const glow = glowRef.current;

    if (!wrapper || !card || !enableTilt) return;

    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window;

    if (isTouchDevice && !enableMobileTilt) return;

    const handlePointerMove = (event) => {
      const rect = wrapper.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const normalizedX = (x - centerX) / centerX;
      const normalizedY = (y - centerY) / centerY;

      const rotateY = normalizedX * 9;
      const rotateX = normalizedY * -9;

      card.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.025, 1.025, 1.025)
      `;

      if (glow) {
        glow.style.transform = `
          translate(
            ${normalizedX * 14}px,
            ${normalizedY * 14}px
          )
          scale(1.08)
        `;
      }

      wrapper.style.setProperty(
        '--pointer-x',
        `${(x / rect.width) * 100}%`
      );

      wrapper.style.setProperty(
        '--pointer-y',
        `${(y / rect.height) * 100}%`
      );
    };

    const handlePointerLeave = () => {
      card.style.transform = `
        perspective(900px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1,1,1)
      `;

      if (glow) {
        glow.style.transform = 'translate(0,0) scale(1)';
      }
    };

    wrapper.addEventListener(
      'pointermove',
      handlePointerMove
    );

    wrapper.addEventListener(
      'pointerleave',
      handlePointerLeave
    );

    return () => {
      wrapper.removeEventListener(
        'pointermove',
        handlePointerMove
      );

      wrapper.removeEventListener(
        'pointerleave',
        handlePointerLeave
      );
    };
  }, [enableTilt, enableMobileTilt]);

  return (
    <div
      ref={wrapperRef}
      className={`profile-card-wrapper ${className}`}
    >
      {/* Behind glow */}

      {behindGlowEnabled && (
        <div
          ref={glowRef}
          className="profile-card-behind-glow"
          style={{
            background: behindGlowColor,
            width: behindGlowSize,
            height: behindGlowSize,
          }}
        />
      )}

      {/* Main card */}

      <article
        ref={cardRef}
        className="profile-card"
        style={{
          '--profile-inner-gradient': innerGradient,
        }}
      >
        {/* Shine */}

        <div className="profile-card-shine" />

        {/* Profile image */}

        <div className="profile-card-image-wrapper">
          <img
            src={avatarUrl}
            alt={name}
            className="profile-card-image"
            draggable={false}
          />

          <div className="profile-card-image-overlay" />
        </div>

        {/* Information below image */}

        {showUserInfo && (
          <div className="profile-card-info">

            {/* Handle */}

            <p className="profile-card-handle">
              @{handle}
            </p>

            {/* Name */}

            <h3 className="profile-card-name">
              {name}
            </h3>

            {/* Title */}

            <p className="profile-card-title">
              {title}
            </p>

          </div>
        )}
      </article>
    </div>
  );
}