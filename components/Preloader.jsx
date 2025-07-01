// components/Preloader.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const messages = ["Hello!", "¡Hola!", "Bonjour!", "Nǐ hǎo!", "Kon nichiwa!", "Selamat Datang!"]; // Tambah pesan jika mau
const PRELOADER_DURATION = 5000; // Durasi total preloader dalam milidetik (misal: 3 detik)
const MESSAGE_INTERVAL = 800; // Interval antara setiap pesan dalam milidetik

const Preloader = ({ onFinish }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Timer untuk mengubah pesan
    if (currentMessageIndex < messages.length - 1) {
      const messageTimer = setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => prevIndex + 1);
      }, MESSAGE_INTERVAL);
      return () => clearTimeout(messageTimer);
    }
  }, [currentMessageIndex]);

  useEffect(() => {
    // Timer untuk menyembunyikan preloader setelah durasi total
    const preloaderTimer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) {
        onFinish(); // Panggil callback jika preloader selesai
      }
    }, PRELOADER_DURATION);

    return () => clearTimeout(preloaderTimer);
  }, [onFinish]); // Dependency array: jalankan sekali saat komponen mount

  if (!isVisible) {
    return null; // Jangan render apa-apa jika sudah tidak terlihat
  }

  // Animasi teks
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950 text-white font-bold text-4xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentMessageIndex} // Penting untuk animasi keluar/masuk setiap pesan
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="text-body text-center"
        >
          {messages[currentMessageIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default Preloader;