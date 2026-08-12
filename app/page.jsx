'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import LanyardShowcaseSection from '@/components/LanyardShowcaseSection';
import AboutPageContent from '@/components/AboutPageContent';
import ToolsSection from '@/components/ToolsSection';
import ProjectsSection from '@/components/ProjectsSection';
import MusicPlayerTrigger from '@/components/MusicPlayerTrigger';
import QuoteSection from "@/components/QuoteSection";

// ScrollHandler hanya dirender di client
const ScrollHandler = dynamic(() => import('@/components/ScrollHandler'), {
  ssr: false,
});

export default function HomeClient() {
  return (
    <main>
      <ScrollHandler />
      <HeroSection />
      <LanyardShowcaseSection />
      <AboutPageContent />
      <ToolsSection />
      <QuoteSection />
      <ProjectsSection />
      <MusicPlayerTrigger />
    </main>
  );
}
