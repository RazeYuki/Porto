'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram, Download } from 'lucide-react';
import Image from 'next/image';
import InteractiveLanyard from '@/components/InteractiveLanyard';
import { useRouter } from 'next/navigation';

// Skill groups derived from existing ToolsSection and About content — no invented skills.
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

  return (
    <main className="min-h-screen w-full bg-primary-bg text-primary-text px-6 py-12">
      <motion.section
        className="w-full max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Top grid: Lanyard | Skills & Info | Social */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT: Interactive Lanyard (visual centerpiece) */}
          <aside className="order-1 lg:order-1 flex justify-center lg:justify-start">
            <div className="w-full max-w-xs sm:max-w-sm lg:max-w-[360px]">
              {/* subtle card wrapper to keep balance */}
              <div className="rounded-xl bg-transparent p-2 lg:p-4">
                <InteractiveLanyard />
              </div>
            </div>
          </aside>

          {/* CENTER: Profile / Skills */}
          <div className="order-2 lg:order-2 lg:pl-4 lg:border-l lg:border-border-primary/20">
            <div className="bg-secondary-bg p-6 rounded-xl shadow border border-border-primary">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image src="/images/profile.jpg" alt="Hamdika Putra" fill className="object-cover" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold">Hamdika Putra</h1>
                  <p className="text-sm text-secondary-text mt-1">Big Data Analytics &amp; Machine Learning</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-primary-text/85">
                I am an Informatics student at Universitas Amikom Yogyakarta with a focus on machine learning, data analysis and interactive frontend experiences. I build data-driven applications and polished interfaces.
              </p>

              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Keahlian Utama</h3>
                <div className="flex flex-wrap">
                  {Object.entries(SKILLS).map(([group, items]) => (
                    <div key={group} className="w-full sm:w-1/2 mb-3">
                      <div className="text-xs font-semibold text-secondary-text mb-1">{group}</div>
                      <div className="flex flex-wrap">
                        {items.map((s) => (
                          <span key={s} className="mr-2 mb-2 inline-flex items-center text-xs px-3 py-1 rounded-full bg-primary-bg/40 border border-border-primary text-primary-text">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
n          </div>

          {/* RIGHT: Connections & Quick Actions */}
          <aside className="order-3 lg:order-3 lg:pl-6 lg:border-l lg:border-border-primary/20">
            <div className="bg-secondary-bg p-6 rounded-xl shadow border border-border-primary space-y-4">
              <h3 className="text-sm font-semibold">Koneksi &amp; Sosial</h3>
              <div className="space-y-3">
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 p-3 rounded-md border border-border-primary/30 hover:bg-primary-bg/40 transition">
                    <div className="flex items-center gap-3">
                      <span className="text-teal-200">{s.icon}</span>
                      <div>
                        <div className="text-sm font-medium">{s.label}</div>
                        <div className="text-xs text-secondary-text">{s.href.replace(/https?:\/\//, '')}</div>
                      </div>
                    </div>
                    <div className="text-xs text-secondary-text">Open</div>
                  </a>
                ))}
              </div>
n              <div className="pt-2 border-t border-border-primary/20">
                <h4 className="text-xs font-semibold mb-2">Aksi Cepat</h4>
                <div className="flex flex-col gap-2">
                  <a href="https://drive.google.com/file/d/1iDmuU2lcHynCsv5ZvA_wh5NiQXcie-e-/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-accent-light text-primary-bg font-semibold">
                    <Download size={16} />
                    Download Resume / CV
                  </a>
                  <button onClick={() => router.push('#projects')} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-border-primary text-sm">
                    View Projects
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Below: About me & Experience (full width) */}
        <div className="mt-10 grid grid-cols-1 gap-6">
          <div className="bg-secondary-bg p-6 rounded-xl shadow border border-border-primary">
            <h2 className="text-lg font-bold mb-3">About Me</h2>
            <p className="text-sm text-primary-text/85 leading-relaxed">
              I enjoy working on meaningful projects that challenge both technical and analytical skills. I have experience in model building, data preprocessing, and deploying small web apps and dashboards. I continue to learn and collaborate on projects that combine ML and polished frontend UX.
            </p>
          </div>

          <div className="bg-secondary-bg p-6 rounded-xl shadow border border-border-primary">
            <h2 className="text-lg font-bold mb-3">Experience</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between border-b pb-2 border-border-primary">
                <div>
                  <strong>Bangkit Academy</strong>
                  <div className="text-secondary-text text-xs">Machine Learning Cohort 2024</div>
                </div>
                <div className="text-secondary-text text-xs">September 2024 – Desember 2024</div>
              </li>
              <li className="flex justify-between border-b pb-2 border-border-primary">
                <div>
                  <strong>Himpunan Mahasiswa Informatika (HMIF)</strong>
                  <div className="text-secondary-text text-xs">Hubungan Masyarakat</div>
                </div>
                <div className="text-secondary-text text-xs">Februari 2023 – September 2024</div>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default AboutPageContent;
