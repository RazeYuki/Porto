'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code, Home, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

const navItems = [
  { href: '/', icon: <Home size={20} />, label: 'Home' },
  { href: '/?section=projects', icon: <Code size={20} />, label: 'Projects' },
];

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextTheme = savedTheme ? savedTheme === 'dark' : prefersDarkMode;

    setIsDarkMode(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme);
    localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
  };

  const toggleMute = () => {
    const audio = document.querySelector('audio');
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const changeLanguage = (nextLanguage) => {
    setLang(nextLanguage);
  };

  const getXOffset = (index, activeIndex) => {
    if (activeIndex === null || activeIndex === index) return 0;
    return index < activeIndex ? -8 : 8;
  };

  return (
    <header className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <nav className="flex items-center rounded-full border border-[color:var(--color-border-primary)] bg-[color:var(--color-bg-primary)] px-3 py-2 shadow-md text-[color:var(--color-text-primary)]">
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            className="mx-1"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{ x: getXOffset(index, hoveredIndex) }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Link
              href={item.href}
              className="inline-flex size-10 items-center justify-center rounded-full transition hover:bg-[color:var(--color-bg-secondary)]"
              aria-label={item.label}
            >
              {item.icon}
            </Link>
          </motion.div>
        ))}

        <div className="mx-2 h-6 w-px bg-[color:var(--color-border-primary)]" />

        <div className="mx-1 inline-flex rounded-full border border-[color:var(--color-border-primary)] p-1">
          {[
            { value: 'EN', label: 'EN' },
            { value: 'ID', label: 'ID' },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => changeLanguage(option.value)}
              className={`rounded-full px-2.5 py-1.5 text-[10px] font-extrabold tracking-[0.08em] transition ${
                lang === option.value
                  ? 'bg-[#3b82f6] text-white shadow-sm'
                  : 'text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-bg-secondary)]'
              }`}
              aria-label={`Change language to ${option.value === 'ID' ? 'Indonesian' : 'English'}`}
              aria-pressed={lang === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mx-2 h-6 w-px bg-[color:var(--color-border-primary)]" />

        <button
          onClick={toggleTheme}
          className="inline-flex size-10 items-center justify-center rounded-full transition hover:bg-[color:var(--color-bg-secondary)]"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button
          onClick={toggleMute}
          className="ml-2 inline-flex size-10 items-center justify-center rounded-full transition hover:bg-[color:var(--color-bg-secondary)]"
          aria-label="Toggle Mute"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </nav>
    </header>
  );
}
