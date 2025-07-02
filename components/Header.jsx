'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Sun, Moon, Home, UserRound, Code, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  {
    href: '/',
    icon: <Home size={20} />, // home
    label: 'Home'
  },
  {
    href: '/about',
    icon: <UserRound size={20} />, // aboutmainpage
    label: 'about'
  },
  {
    href: '/?section=projects',
    icon: <Code size={20} />, // projects
    label: 'Projects'
  }
];

const socialItems = [
  {
    href: 'https://github.com/RazeYuki',
    icon: <Github size={20} />, // github
    label: 'GitHub'
  },
  {
    href: 'https://www.linkedin.com/in/hamdika-putra-8a9b5629a/',
    icon: <Linkedin size={20} />, // linkedin
    label: 'LinkedIn'
  }
];

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkMode);
      document.documentElement.classList.toggle('dark', prefersDarkMode);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const toggleMute = () => {
    const audio = document.querySelector('audio');
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  return (
    <header className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center bg-primary-bg text-primary-text border border-border-primary rounded-full px-3 py-2 shadow-md">
        {/* Navigation Items */}
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            className="mx-1"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{ x: hoveredIndex !== null && hoveredIndex !== index ? (index < hoveredIndex ? -8 : 8) : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Link
              href={item.href}
              className="inline-flex items-center justify-center size-10 rounded-full hover:bg-secondary-bg transition"
              aria-label={item.label}
            >
              {item.icon}
            </Link>
          </motion.div>
        ))}

        {/* Separator */}
        <div className="w-[1px] h-6 bg-border-primary mx-2" />

        {/* Social Items */}
        {socialItems.map((item, index) => (
          <motion.div
            key={item.href}
            className="mx-1"
            onMouseEnter={() => setHoveredIndex(index + navItems.length)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{ x: hoveredIndex !== null && hoveredIndex !== index + navItems.length ? (index + navItems.length < hoveredIndex ? -8 : 8) : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center size-10 rounded-full hover:bg-secondary-bg transition"
              aria-label={item.label}
            >
              {item.icon}
            </a>
          </motion.div>
        ))}

        {/* Separator */}
        <div className="w-[1px] h-6 bg-border-primary mx-2" />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="inline-flex items-center justify-center size-10 rounded-full hover:bg-secondary-bg transition"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Mute Toggle */}
        <button
          onClick={toggleMute}
          className="inline-flex items-center justify-center size-10 rounded-full hover:bg-secondary-bg transition ml-2"
          aria-label="Toggle Mute"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </nav>
    </header>
  );
};

export default Header;