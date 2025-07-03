import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ToolsSection from '../components/ToolsSection';
import ProjectsSection from '@/components/ProjectsSection';
import MusicPlayerTrigger from '@/components/MusicPlayerTrigger';
import QuoteSection from "@/components/QuoteSection";
import ScrollHandler from "@/components/ScrollHandler"; // impor komponen baru

export default function Home() {
  return (
    <main>
      <ScrollHandler /> {/* client-side logic dimasukkan di sini */}
      <HeroSection />
      <AboutSection />
      <ToolsSection />
      <QuoteSection />
      <ProjectsSection />
      <MusicPlayerTrigger />
    </main>
  );
}
