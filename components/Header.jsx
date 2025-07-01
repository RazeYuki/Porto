// components/Header.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { type: "tween", duration: 0.3 } },
    exit: { opacity: 0, x: "100%", transition: { type: "tween", duration: 0.3 } }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-sm z-50 shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition duration-300">
          [Nama Anda]
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="#about" className="text-gray-300 hover:text-white transition duration-300 font-medium">Tentang Saya</Link>
          <Link href="#projects" className="text-gray-300 hover:text-white transition duration-300 font-medium">Karya</Link>
          <Link href="#contact" className="text-gray-300 hover:text-white transition duration-300 font-medium">Kontak</Link>
        </div>

        <button className="md:hidden text-gray-300 hover:text-white" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center space-y-8 md:hidden"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                <Link href="#about" className="text-gray-200 text-3xl hover:text-white" onClick={toggleMenu}>Tentang Saya</Link>
              </motion.div>
              <motion.div variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <Link href="#projects" className="text-gray-200 text-3xl hover:text-white" onClick={toggleMenu}>Karya</Link>
              </motion.div>
              <motion.div variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                <Link href="#contact" className="text-gray-200 text-3xl hover:text-white" onClick={toggleMenu}>Kontak</Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;