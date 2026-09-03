'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('EN');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedLang = localStorage.getItem('portfolio-lang');
    if (savedLang === 'EN' || savedLang === 'ID') {
      setLangState(savedLang);
      document.documentElement.lang = savedLang.toLowerCase();
    }
  }, []);

  const setLang = (newLang) => {
    if (newLang !== 'EN' && newLang !== 'ID') return;

    setLangState(newLang);
    localStorage.setItem('portfolio-lang', newLang);
    document.documentElement.lang = newLang.toLowerCase();
  };

  return (
    <LanguageContext.Provider value={{ lang: mounted ? lang : 'EN', setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}
