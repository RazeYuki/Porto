// components/Preloader.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const messages = ["Hello!", "¡Hola!", "Bonjour!", "Nǐ hǎo!", "Kon nichiwa!", "Selamat Datang!"];
const PRELOADER_DURATION = 5000;
const MESSAGE_INTERVAL = 800;

const Preloader = ({ onFinish }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (currentMessageIndex < messages.length - 1) {
      const messageTimer = setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => prevIndex + 1);
      }, MESSAGE_INTERVAL);
      return () => clearTimeout(messageTimer);
    }
  }, [currentMessageIndex, messages.length]);

  useEffect(() => {
    const preloaderTimer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) {
        onFinish();
      }
    }, PRELOADER_DURATION);

    return () => clearTimeout(preloaderTimer);
  }, [onFinish]);

  if (!isVisible) {
    return null;
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    // UBAH BARIS INI: bg-primary-bg dan text-primary-text
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white font-bold text-4xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentMessageIndex}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="text-center"
        >
          {messages[currentMessageIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default Preloader;