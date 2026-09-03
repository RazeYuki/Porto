'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const ScrollHandler = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      const el = document.getElementById(section);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, [searchParams]);

  return null;
};

export default ScrollHandler;
