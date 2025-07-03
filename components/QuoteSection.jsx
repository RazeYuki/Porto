'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const fullQuote = `Teknologi bukan hanya tentang baris kode yang berjalan sempurna.
Ini adalah bahasa baru untuk membangun mimpi, menjembatani ide,
dan menyentuh kehidupan banyak orang — satu solusi sederhana bisa berdampak besar jika ditulis dengan hati.`;

const QuoteSection = () => {
  const [quoteText, setQuoteText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullQuote.length) {
      const timeout = setTimeout(() => {
        setQuoteText((prev) => prev + fullQuote.charAt(index));
        setIndex(index + 1);
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <section className="relative min-h-[90vh] w-full bg-primary-bg text-primary-text px-4 pt-24 pb-16 flex items-start justify-center overflow-hidden">
      {/* Background Title */}
      <h1 className="absolute text-[30vw] font-black text-[#0000000a] dark:text-[#ffffff0a] select-none leading-none tracking-tight z-0 top-0 left-1/2 -translate-x-1/2">
        QUOTES
      </h1>

      {/* Quote Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl text-center flex flex-col items-center"
      >
        <div className="text-7xl md:text-9xl font-bold mb-4 text-accent-light leading-none">
          “
        </div>

        {/* Typing Effect Quote */}
        <p className="text-xl md:text-2xl font-medium text-secondary-text italic leading-relaxed whitespace-pre-wrap min-h-[160px]">
          {quoteText}
        </p>

        {/* Glowing Animated Name */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-3xl md:text-4xl font-extrabold tracking-wider text-accent-light uppercase drop-shadow animate-pulse-glow"
        >
          — Hamdika Putra
        </motion.span>
      </motion.div>

      {/* Glow Keyframes */}
      <style jsx>{`
        @keyframes glow {
          0% {
            text-shadow: 0 0 10px #00f2ff, 0 0 20px #00f2ff, 0 0 40px #00f2ff;
          }
          50% {
            text-shadow: 0 0 20px #00f2ff, 0 0 30px #00f2ff, 0 0 60px #00f2ff;
          }
          100% {
            text-shadow: 0 0 10px #00f2ff, 0 0 20px #00f2ff, 0 0 40px #00f2ff;
          }
        }

        .animate-pulse-glow {
          animation: glow 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default QuoteSection;
