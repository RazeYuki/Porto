import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ToolsSection from '@/components/ToolsSection';
import ProjectsSection from '@/components/ProjectsSection';
import MusicPlayerTrigger from '@/components/MusicPlayerTrigger';
import QuoteSection from "@/components/QuoteSection";

// ini kuncinya: pakai dynamic import agar cuma di-render di browser (client-side)
const ScrollHandler = dynamic(() => import('@/components/ScrollHandler'), { ssr: false });

export default function Home() {
  return (
    <main>
      <ScrollHandler /> {/* <--- aman untuk deploy */}
      <HeroSection />
      <AboutSection />
      <ToolsSection />
      <QuoteSection />
      <ProjectsSection />
      <MusicPlayerTrigger />
    </main>
  );
}
