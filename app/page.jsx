import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ToolsSection from '@/components/ToolsSection';
import ProjectsSection from '@/components/ProjectsSection';
import MusicPlayerTrigger from '@/components/MusicPlayerTrigger';
import QuoteSection from "@/components/QuoteSection";
import dynamic from 'next/dynamic';

const ScrollHandler = dynamic(() => import('@/components/ScrollHandler'), { ssr: false });

export default function Home() {
  return (
    <main>
      <ScrollHandler /> {/* Untuk handle scroll via ?section=... */}
      <HeroSection />
      <AboutSection />
      <ToolsSection />
      <QuoteSection />
      <ProjectsSection />
      <MusicPlayerTrigger />
    </main>
  );
}
