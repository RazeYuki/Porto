'use client';

import { useEffect, useState } from 'react';
import {
  Award,
  Brain,
  FileText,
  GraduationCap,
  Rocket,
} from 'lucide-react';

import RadialOrbitalTimeline from '@/components/reactbits/RadialOrbitalTimeline';
import { useLanguage } from '@/components/providers/LanguageProvider';

const timelineData = [
  {
    id: 1,

    type: 'college',

    title: 'College',

    date: '2022 — 2026',

    category: 'Education',

    content:
      'Built a foundation in computer science and machine learning through academic study, hands-on projects, and continuous experimentation. The journey developed from coursework into practical machine learning and data-driven projects.',

    highlightLabel: 'Academic Achievement',

    highlight: 'GPA 3.51 / 4.00',

    related: [2],

    status: 'completed',

    icon: GraduationCap,
  },

  {
    id: 2,

    type: 'bangkit',

    title: 'Bangkit',

    date: '2024',

    category: 'Professional Development',

    content:
      'Expanded practical skills through the Bangkit program, strengthening machine learning knowledge while gaining experience through structured learning, projects, collaboration, and professional development.',

    highlightLabel: 'Program',

    highlight: 'Machine Learning',

    related: [1, 3],

    status: 'completed',

    icon: Brain,
  },

  {
    id: 3,

    type: 'research',

    title: 'Research',

    date: '2025',

    category: 'Research',

    content:
      'Published “Comparative Study of Logistic Regression, Random Forest, and XGBoost for Bank Loan Approval Classification” in the Journal of Applied Informatics and Computing (JAIC), Vol. 9 No. 5, as first author.',

    highlightLabel: 'Publication',

    highlight: 'JAIC · SINTA 3 · First Author',

    related: [2, 4],

    status: 'completed',

    icon: FileText,
  },

  {
    id: 4,

    type: 'graduate',

    title: 'Graduate',

    date: '2026',

    category: 'Milestone',

    content:
      'Completed the undergraduate academic requirements and reached the final stage before graduation. Yudisium has been completed, with the graduation ceremony scheduled for October 2026.',

    highlightLabel: 'Academic Status',

    highlight: 'Yudisium Completed',

    related: [3, 5],

    status: 'completed',

    icon: Award,
  },

  {
    id: 5,

    type: 'next',

    title: 'Next Chapter',

    date: '2026 →',

    category: 'Career',

    content:
      'Ready to bring machine learning, research, and practical project experience into a professional environment while continuing to build useful data-driven solutions.',

    highlightLabel: 'Looking For',

    highlight: 'ML & Data Opportunities',

    related: [4],

    status: 'current',

    icon: Rocket,
  },
];

export default function JourneySection() {
  const { lang } = useLanguage();
  const [isTimelineReady, setIsTimelineReady] = useState(false);
  const content = lang === 'ID'
    ? {
        eyebrow: 'Perjalanan Saya',
        title: <>Jalan di balik<br />proyek-proyek.</>,
        description: 'Dari fondasi perkuliahan menuju machine learning, riset, dan bab berikutnya. Setiap pencapaian membentuk cara saya mendekati masalah, membangun sistem, dan bekerja dengan data.',
      }
    : {
        eyebrow: 'My Journey',
        title: <>The path behind<br />the projects.</>,
        description: 'From university foundations to machine learning, research, and the next chapter. Every milestone shaped how I approach problems, build systems, and work with data.',
      };

  useEffect(() => {
    setIsTimelineReady(true);
  }, []);

  return (
    <section
      id="journey"
      className="
        relative
        isolate
        z-10
        w-full
        min-h-[980px]
        overflow-hidden
        theme-section
        bg-[#08090b]
      "
    >
      {/* Opaque section background.
          This keeps the timeline effect contained without
          introducing a different base color between sections. */}
      <div className="absolute inset-0 z-0 bg-[#08090b]" />

      {/* Section heading */}
      <div
        className="
          relative
          z-20
          px-5
          pt-20
          sm:px-8
          sm:pt-24
          lg:px-12
          xl:px-20
        "
      >
        <div className="mx-auto max-w-7xl">
          <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f39ac7]">
            <span className="h-px w-6 bg-[#e879b6]" />
            {content.eyebrow}
          </p>

          <h2 className="mt-4 text-4xl font-extrabold leading-none tracking-[-0.06em] text-[#f8fafc] sm:text-5xl lg:text-6xl">
            {content.title}
          </h2>

          <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-[#d8cae4] sm:text-[15px]">
            {content.description}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div
        className="
          relative
          z-10
          mt-[-20px]
          sm:mt-[-10px]
        "
      >
        {isTimelineReady ? (
          <RadialOrbitalTimeline timelineData={timelineData} />
        ) : (
          <div className="rotl" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}
