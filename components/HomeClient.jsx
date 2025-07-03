'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ToolsSection from '@/components/ToolsSection';
import ProjectsSection from '@/components/ProjectsSection';
import MusicPlayerTrigger from '@/components/MusicPlayerTrigger';
import QuoteSection from '@/components/QuoteSection';

const ScrollHandler = dynamic(() => import('@/components/ScrollHandler'), {
  ssr: false,
});

export default function HomeClient() {
  return (
    <main>
      <ScrollHandler />
      <HeroSection />
      <AboutSection />
      <ToolsSection />
      <QuoteSection />
      <ProjectsSection />
      <MusicPlayerTrigger />
    </main>
  );
}
