'use client';

import dynamic from 'next/dynamic';

import HeroSection from '@/components/sections/HeroSection';
import AboutPageContent from '@/components/sections/AboutPageContent';
import ToolsSection from '@/components/sections/ToolsSection';
import CertificatesSection from '@/components/sections/CertificatesSection';
import JourneySection from '@/components/sections/JourneySection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import MusicPlayerTrigger from '@/components/sections/MusicPlayerTrigger';
import QuoteSection from '@/components/sections/QuoteSection';

const ScrollHandler = dynamic(
  () => import('@/components/features/ScrollHandler'),
  {
    ssr: false,
  }
);

export default function HomePage() {
  return (
    <main>
      <ScrollHandler />

      <HeroSection />

      <AboutPageContent />

      <ToolsSection />

      <JourneySection />

      <CertificatesSection />

      <QuoteSection />

      <ProjectsSection />

      <MusicPlayerTrigger />
    </main>
  );
}