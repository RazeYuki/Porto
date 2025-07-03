'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ToolsSection from '../components/ToolsSection';
import ProjectsSection from '@/components/ProjectsSection';
import MusicPlayerTrigger from '@/components/MusicPlayerTrigger';
import QuoteSection from "@/components/QuoteSection";

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      const el = document.getElementById(section);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 500); // beri jeda agar komponen sudah ter-render
      }
    }
  }, [searchParams]);

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ToolsSection />
      <QuoteSection />
      <ProjectsSection /> {/* pastikan ada id="projects" di komponen ini */}
      <MusicPlayerTrigger />
    </main>
  );
}
