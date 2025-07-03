'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const codeString = `// Tentang Saya
const nama = "Hamdika Putra";
const role = "Big Data & Machine Learning Enthusiast";
const location = "Yogyakarta, Indonesia";

function getAboutMe() {
  return {
    background: "Mahasiswa Informatika - Universitas Amikom",
    focus: ["Big Data Analytics", "Deep Learning", "Frontend Development"],
    program: "Alumni Bangkit Academy - Machine Learning Path",
    goal: "Membangun solusi digital berbasis AI dan teknologi modern.",
  };
}

console.log(getAboutMe());`;

const AboutSection = () => {
  const containerRef = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [speed, setSpeed] = useState(80);
  const intervalRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (index >= codeString.length) return;

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => prev + codeString.charAt(index));
      setIndex((prev) => prev + 1);
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [index, speed]);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percentage = y / rect.height;

    const minSpeed = 20;
    const maxSpeed = 120;
    const newSpeed = Math.floor(maxSpeed - (maxSpeed - minSpeed) * percentage);

    setSpeed(newSpeed);
  };

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 bg-primary-bg text-primary-text overflow-hidden"
    >
      {/* Background Text "ABOUT" */}
      <h1 className="absolute text-[28vw] font-black text-[#0000000a] dark:text-[#ffffff0a] select-none leading-none tracking-tight z-0 top-0 left-1/2 -translate-x-1/2">
        ABOUT
      </h1>

      {/* Typing Effect Code Box */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative z-10 bg-[#1e1e1e] text-[#d4d4d4] w-full max-w-4xl rounded-xl shadow-xl p-6 md:p-10 font-mono text-sm md:text-base leading-relaxed cursor-default"
      >
        <pre>
          <code>{displayText}</code>
        </pre>
      </div>

      {/* Button Outside and Centered */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/about')}
        className="mt-8 z-10 rounded-lg border border-accent-light px-6 py-2 text-accent-light hover:bg-accent-light hover:text-primary-bg transition-colors duration-300"
      >
        Selengkapnya →
      </motion.button>
    </section>
  );
};

export default AboutSection;
