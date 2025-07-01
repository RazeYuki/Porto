// components/Header.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DigitalClock from './DigitalClock';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed w-full top-0 left-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm z-50 shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo di kiri */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-2xl font-bold text-teal-500 hover:text-teal-400 transition-colors duration-300">
            Dika.dev
          </Link>
        </motion.div>

        {/* --- Mulai Modifikasi di sini --- */}
        {/* Kelompokkan jam dan navigasi desktop/mobile toggle */}
        <div className="flex items-center space-x-8"> {/* Gunakan flex untuk mengelompokkan */}
          <DigitalClock /> {/* Jam Digital */}

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex space-x-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="#about" className="text-gray-300 hover:text-teal-500 transition-colors duration-300 text-lg">Tentang</Link>
            <Link href="#projects" className="text-gray-300 hover:text-teal-500 transition-colors duration-300 text-lg">Proyek</Link>
            <Link href="#contact" className="text-gray-300 hover:text-teal-500 transition-colors duration-300 text-lg">Kontak</Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded p-1">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* --- Akhir Modifikasi --- */}

        {/* Mobile Navigation (Conditional) */}
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full bg-gray-800 bg-opacity-95 backdrop-blur-md shadow-lg py-4 border-t border-gray-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-4">
              <Link href="#about" className="text-gray-100 hover:text-teal-500 transition-colors duration-300 text-xl" onClick={toggleMenu}>Tentang</Link>
              <Link href="#projects" className="text-gray-100 hover:text-teal-500 transition-colors duration-300 text-xl" onClick={toggleMenu}>Proyek</Link>
              <Link href="#contact" className="text-gray-100 hover:text-teal-500 transition-colors duration-300 text-xl" onClick={toggleMenu}>Kontak</Link>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;