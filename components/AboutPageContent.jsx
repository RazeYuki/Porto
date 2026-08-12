'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram, Download } from 'lucide-react';
import InteractiveLanyard from '@/components/InteractiveLanyard';
import { useRouter } from 'next/navigation';

// Skill groups derived from existing ToolsSection and About content — keep factual.
const SKILLS = {
  FRONTEND: ['React', 'Next.js', 'HTML', 'CSS'],
  'ML / DATA': ['Python', 'TensorFlow'],
  TOOLS: ['Figma']
};

const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/RazeYuki', icon: <Github size={18} /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hamdika-putra-8a9b5629a/', icon: <Linkedin size={18} /> },
  { label: 'Instagram', href: 'https://www.instagram.com/hmdkaptr_/', icon: <Instagram size={18} /> },
  { label: 'Email', href: 'mailto:hmdkaptr@gmail.com', icon: <Mail size={18} /> },
];

const AboutPageContent = () => {
  const router = useRouter();
  const techs = Object.values(SKILLS).flat();

  // Lanyard uses internal physics; provide a subtle ambient bob on the wrapper so it doesn't appear fully static.
  // No entrance pop-up animation — the card remains interactive at all times.

  // Typing code box state (right column)
  const codeString = `// Personal Data\nconst name = "Hamdika Putra";\nconst field = "Big Data Analytics & Machine Learning";\nconst location = "Yogyakarta, Indonesia";\n\nfunction profile() {\n  return {\n    education: "Informatics - Universitas Amikom",\n    experience: ["Bangkit Academy - ML Cohort 2024", "HMIF - Humas"],\n    languages: ["Python", "JavaScript"],\n  };\n}\n\nconsole.log(profile());`;
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  // faster typing default
  const [speed, setSpeed] = useState(6);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (index >= codeString.length) return;
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => prev + codeString.charAt(index));
      setIndex((prev) => prev + 1);
    }, speed);
    return () => clearInterval(intervalRef.current);
  }, [index, speed]);

  // Optional: speed variation by mouse position within the code box
  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percentage = y / rect.height;
    const minSpeed = 4;
    const maxSpeed = 30;
    const newSpeed = Math.floor(maxSpeed - (maxSpeed - minSpeed) * percentage);
    setSpeed(newSpeed);
  };

  const highlightCode = (text) => {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escaped = esc(text);
    return escaped
      .replace(/'(.*?)'/g, "<span class='text-emerald-300'>'$1'</span>")
      .replace(/\b(const|function|return|console|log|developer|skills|name|role)\b/g, "<span class='text-sky-300'>$1</span>")
      .replace(/(\/\/.*?$)/gm, "<span class='text-white/60'>$1</span>");
  };

  return (
    <main className="min-h-screen w-full px-6 py-16">
      <motion.section className="w-full max-w-6xl mx-auto" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Top grid: Lanyard | Skills & Info | Social */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT: Interactive Lanyard (visual centerpiece) */}
          <aside className="order-1 lg:order-1 flex justify-center lg:justify-start" aria-hidden>
            <motion.div initial={{ opacity: 1 }} animate={{ y: [0, -6, 0, 6, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="w-full max-w-xs sm:max-w-sm lg:max-w-[360px]">
              <div className="rounded-xl p-2 lg:p-4">
                <InteractiveLanyard />
              </div>
            </motion.div>
          </aside>

          {/* CENTER: Profile / Skills (remove photo, show name/field/description) */}
          <div className="order-2 lg:order-2 lg:pl-4">
            <div className="p-6 rounded-xl shadow-sm bg-transparent">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold leading-tight">Hamdika Putra</h1>
                <div className="text-sm text-teal-200 font-medium">Big Data Analytics &amp; Machine Learning</div>
                <p className="mt-4 text-sm leading-relaxed text-white/85">
                  I build data-driven applications and polished interactive frontends. Currently focused on machine learning pipelines, model deployment, and creating UX that communicates complex data simply and beautifully.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-3">Keahlian Utama</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(SKILLS).map(([group, items]) => (
                    <div key={group}>
                      <div className="text-xs font-semibold text-white/60 mb-2">{group}</div>
                      <div className="flex flex-wrap">
                        {items.map((s) => (
                          <span key={s} className="mr-2 mb-2 inline-flex items-center text-xs px-3 py-1 rounded-full bg-white/6 text-white/90">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Connections & Quick Actions */}
          <aside className="order-3 lg:order-3 lg:pl-6">
            <div className="p-6 rounded-xl shadow-sm bg-transparent">
              <h3 className="text-sm font-semibold mb-3">Koneksi &amp; Sosial</h3>
              <div className="space-y-3">
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 p-3 rounded-md hover:bg-white/2 transition">
                    <div className="flex items-center gap-3">
                      <span className="text-teal-200">{s.icon}</span>
                      <div>
                        <div className="text-sm font-medium">{s.label}</div>
                        <div className="text-xs text-white/60">{s.href.replace(/https?:\/\//, '')}</div>
                      </div>
                    </div>
                    <div className="text-xs text-white/60">Open</div>
                  </a>
                ))}
              </div>

              <div className="pt-4 mt-4 border-t border-white/6">
                <h4 className="text-xs font-semibold mb-2">Aksi Cepat</h4>
                <div className="flex flex-col gap-2">
                  <a href="https://drive.google.com/file/d/1iDmuU2lcHynCsv5ZvA_wh5NiQXcie-e-/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-accent-light text-black font-semibold">
                    <Download size={16} />
                    Download Resume / CV
                  </a>
                  <button onClick={() => router.push('#projects')} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm bg-transparent border border-white/6">
                    View Projects
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Two-column: About Me (left) + Typing detail (right) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="p-6 rounded-xl shadow-sm bg-transparent">
            <h2 className="text-2xl font-bold mb-2">About Me</h2>
            <p className="text-sm text-white/85 leading-relaxed">I build data-driven applications and polished interactive frontends. Currently focused on machine learning pipelines, model deployment, and creating UX that communicates complex data simply and beautifully.</p>

            <div className="mt-6">              <h3 className="text-sm font-semibold mb-2">Ringkasan</h3>              <ul className="text-sm text-white/80 space-y-1">                <li>Mahasiswa Informatika — Universitas Amikom Yogyakarta</li>                <li>Fokus: Machine Learning, Big Data, Frontend Interactivity</li>                <li>Pengalaman: Bangkit Academy (ML Cohort 2024), HMIF</li>              </ul>            </div>          </div>          <div ref={containerRef} onMouseMove={handleMouseMove} className="relative p-6 rounded-xl shadow-sm bg-white/5">            <h2 className="text-lg font-semibold mb-3">Detail Data Diri</h2>            <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-white/95"><code>{displayText}</code></pre>          </div>        </div>        {/* Experience full width */}
        <div className="mt-10">          <div className="p-6 rounded-xl shadow-sm bg-transparent">            <h2 className="text-lg font-bold mb-3">Experience</h2>            <ul className="space-y-4 text-sm">              <li className="flex justify-between border-b pb-2 border-white/6">                <div>                  <strong>Bangkit Academy</strong>                  <div className="text-white/60 text-xs">Machine Learning Cohort 2024</div>                </div>                <div className="text-white/60 text-xs">September 2024 – Desember 2024</div>              </li>              <li className="flex justify-between border-b pb-2 border-white/6">                <div>                  <strong>Himpunan Mahasiswa Informatika (HMIF)</strong>                  <div className="text-white/60 text-xs">Hubungan Masyarakat</div>                </div>                <div className="text-white/60 text-xs">Februari 2023 – September 2024</div>              </li>            </ul>          </div>        </div>
      </motion.section>
    </main>
  );
};

export default AboutPageContent;