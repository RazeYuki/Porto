'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const tools = [
  { name: 'React', src: '/images/react.png' },
  { name: 'Next.js', src: '/images/nextjs.png' },
  { name: 'TensorFlow', src: '/images/tensorflow.png' },
  { name: 'Python', src: '/images/python.png' },
  { name: 'HTML', src: '/images/html.png' },
  { name: 'CSS', src: '/images/css.png' },
  { name: 'Figma', src: '/images/figma.png' },
];

const ToolsSection = () => {
  const router = useRouter();
  const repeatedTools = [...tools, ...tools, ...tools, ...tools, ...tools];

  return (
    <section
      id="tools"
      className="relative w-full py-32 mb-24 bg-primary-bg text-primary-text overflow-hidden flex flex-col items-center"
    >
      {/* Background Title */}
      <h1 className="absolute text-[28vw] font-black text-[#00000010] dark:text-[#ffffff10] select-none leading-none tracking-tight z-0 top-0 left-1/2 -translate-x-1/2">
        TOOLS
      </h1>

      {/* Section Title */}
      <h2 className="text-4xl font-bold z-10 text-center mb-12 relative">
        Tools I Use
      </h2>

      {/* Marquee */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="marquee whitespace-nowrap flex gap-">
          {repeatedTools.map((tool, idx) => (
            <div
              key={idx}
              className="inline-flex flex-col items-center justify-center w-28 shrink-0"
            >
              <div className="relative w-24 h-24 p-4 rounded-2xl bg-secondary-bg border border-border-primary shadow-[0_0_15px_#00f2ff44] hover:shadow-[0_0_25px_#00f2ff88] transition">
                <Image
                  src={tool.src}
                  alt={tool.name}
                  fill
                  className="object-contain filter dark:invert dark:brightness-100 transition duration-300"
                />
              </div>
              <span className="mt-2 text-sm font-medium text-center text-primary-text">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/about')}
        className="mt-12 z-10 rounded-lg border border-accent-light px-6 py-2 text-accent-light hover:bg-accent-light hover:text-primary-bg transition-colors duration-300"
      >
        Selengkapnya →
      </motion.button>

      {/* Marquee Animation */}
      <style jsx>{`
        .marquee {
          animation: marquee 40s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
};

export default ToolsSection;
