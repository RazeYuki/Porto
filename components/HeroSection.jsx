'use client';

import React from 'react';
import { motion } from 'framer-motion';
import RunningText from './RunningText';

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen w-screen
                 py-32 px-4 overflow-hidden snap-start"
    >
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-center mb-4 z-10 text-primary-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Halo, Saya Dika!
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-center mb-8 z-10 text-secondary-text"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Mahasiswa Informatika, fokus pada{' '}
        <span className="font-bold text-accent-light">Big Data Analytics</span>
      </motion.p>

      <div className="relative w-full overflow-hidden py-8">
        <RunningText
          textContent="MACHINE LEARNING ENTHUSIAST"
          speed={150}
          direction="right"
          fontSizeClass="text-[12vw] md:text-[8vw]"
        />
        <RunningText
          textContent="DEEP LEARNING EXPLORER"
          speed={150}
          direction="left"
          fontSizeClass="text-[12vw] md:text-[8vw]"
        />
      </div>

      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-70 bg-teal-700 dark:bg-teal-400 animate-blob animation-delay-2000" style={{ top: '10%', left: '20%' }}></div>
        <div className="absolute w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 bg-orange-500 dark:bg-orange-300 animate-blob animation-delay-4000" style={{ top: '60%', right: '15%' }}></div>
        <div className="absolute w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 bg-purple-600 dark:bg-purple-400 animate-blob" style={{ bottom: '5%', left: '50%' }}></div>
      </div>
    </section>
  );
};

export default HeroSection;
