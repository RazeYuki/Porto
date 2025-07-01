// components/HeroSection.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-[15%] w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-[15%] w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        className="relative z-10 p-8 rounded-lg max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Halo, saya <span className="text-teal-400">Nama Anda</span>.
        </motion.h1>
        <motion.p
          className="text-xl md:text-3xl text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Seorang <span className="font-semibold text-white">[Profesi Anda, misal: Web Developer & UI/UX Designer]</span> yang mengubah ide menjadi pengalaman digital yang berkesan.
        </motion.p>
        <motion.a
          href="#projects"
          className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Lihat Karya Saya &rarr;
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;