'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

const RunningText = ({ textContent, speed = 150, direction = 'left', fontSizeClass = 'text-[12vw] md:text-[8vw]' }) => {
  const controls = useAnimation();
  const containerRef = useRef(null); // Ref untuk div pembungkus utama (untuk IntersectionObserver)
  const spanRef = useRef(null); // Ref untuk mengukur satu span konten
  const textContainerRef = useRef(null); // Ref untuk motion.div yang berisi semua span

  // Gunakan useCallback untuk membungkus fungsi animasi agar tidak dibuat ulang setiap render
  const animateText = useCallback(async () => {
    // Pastikan ref sudah terpasang dan elemen sudah di-render
    if (!textContainerRef.current || !spanRef.current) {
      return;
    }

    const singleSpanWidth = spanRef.current.offsetWidth;
    const gapWidth = 20; // Tailwind 'gap-5' approx 20px. Sesuaikan jika Anda mengubah gap
    const blockWidth = singleSpanWidth + gapWidth;

    // Pastikan blockWidth tidak nol untuk mencegah durasi tak terbatas
    if (blockWidth === 0) {
      return;
    }
    
    // Jarak animasi adalah lebar satu blok konten (span + gap)
    const animationDistance = blockWidth;
    // Durasi animasi berdasarkan jarak dan kecepatan
    const duration = animationDistance / speed;

    // Hentikan animasi sebelumnya sebelum memulai yang baru untuk mencegah flicker
    controls.stop(); 
    
    // Tentukan arah animasi
    if (direction === 'right') {
      await controls.start({
        x: [-animationDistance, 0], // Dari kiri (negatif) ke posisi awal
        transition: {
          x: {
            duration: duration,
            ease: "linear",
            repeat: Infinity, // Ulangi terus menerus
            repeatType: "loop", // Kembali ke awal setelah selesai
          },
        },
      });
    } else { // Default ke kiri
      await controls.start({
        x: [0, -animationDistance], // Dari posisi awal ke kiri (negatif)
        transition: {
          x: {
            duration: duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        },
      });
    }
  }, [controls, textContent, speed, direction, fontSizeClass]); // Dependencies untuk useCallback

  // Effect untuk menjalankan/menghentikan animasi berdasarkan visibilitas elemen
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Beri sedikit waktu setelah elemen terlihat agar DOM punya waktu render sempurna
        // Ini penting untuk pengukuran offsetWidth yang akurat
        const renderDelay = setTimeout(() => {
          animateText();
        }, 300); // Delay sedikit untuk stabilitas
        return () => clearTimeout(renderDelay);
      } else {
        controls.stop(); // Hentikan animasi jika tidak terlihat untuk menghemat resource
      }
    }, { threshold: 0.1 }); // Trigger jika 10% elemen terlihat

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Cleanup function untuk IntersectionObserver dan animasi
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      controls.stop(); // Pastikan animasi berhenti saat komponen di-unmount
    };
  }, [animateText, controls]); // Dependencies untuk useEffect

  // Render beberapa kali konten untuk memastikan loop yang mulus.
  // Jumlah 4-6 kali biasanya cukup untuk mengisi lebar viewport dan memastikan transisi mulus.
  const numberOfContentBlocks = 4; // Render 4 blok konten (masing-masing 2 span)

  return (
    <div
      ref={containerRef} // containerRef untuk IntersectionObserver
      className="relative w-full overflow-hidden whitespace-nowrap py-0 bg-transparent"
      style={{
        // Masking untuk efek fade di tepi
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <motion.div
        className="flex whitespace-nowrap gap-5 flex-nowrap will-change-transform"
        animate={controls}
        ref={textContainerRef} // textContainerRef untuk motion.div
      >
        {/* Ulangi konten beberapa kali untuk efek loop tanpa jeda */}
        {Array(numberOfContentBlocks).fill(textContent).map((text, arrayIndex) => (
          <span
            key={`${text}-${arrayIndex}`} // Key unik untuk setiap span
            // Hanya ref span pertama dari blok pertama untuk pengukuran lebar
            ref={arrayIndex === 0 ? spanRef : null} 
            className={`block ${fontSizeClass} font-extrabold tracking-[-0.07em] leading-[90%] cursor-default text-primary-text`} // Menggunakan alias warna
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default RunningText;