'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  Award,
  BookOpenCheck,
  BrainCircuit,
  GraduationCap,
  FileText,
  GitBranch,
  MapPin,
  Sparkles,
  UserRound,
  UsersRound,
} from 'lucide-react';
import TextType from '@/components/reactbits/TextType';
import { useLanguage } from '@/components/providers/LanguageProvider';
/* =========================================================
   ABOUT HIGHLIGHTS WITH ANIMATIONS
========================================================= */

const HIGHLIGHTS = [
  {
    id: 'gpa',
    icon: GraduationCap,
    value: '3.51',
    suffix: '/4.00',
    label: 'GPA',
    detail: 'S1 Informatics · Universitas AMIKOM Yogyakarta',
    color: 'cyan',
    animationType: 'gpaCounter',
  },
  {
    id: 'sinta3',
    icon: Award,
    value: 'SINTA 3',
    label: 'Published Research',
    detail: 'JAIC Vol. 9 No. 5 · First Author',
    color: 'purple',
    animationType: 'scaleIn',
  },
  {
    id: 'certificates',
    icon: FileText,
    value: '25',
    suffix: '+',
    label: 'Certificates',
    detail: 'Machine Learning · AI · Programming',
    color: 'pink',
    animationType: 'counter',
    countTo: 25,
  },
  {
    id: 'bangkit',
    icon: BookOpenCheck,
    value: '900',
    suffix: '+',
    label: 'Bangkit Academy',
    detail: 'Machine Learning Cohort 2024',
    color: 'blue',
    animationType: 'counter',
    countTo: 900,
  },
  {
    id: 'ml-focus',
    icon: BrainCircuit,
    value: 'Machine Learning',
    label: 'Primary Focus',
    detail: 'Classification · Regression · Forecasting',
    color: 'cyan',
    animationType: 'textReveal',
  },
  {
    id: 'dl-experience',
    icon: Sparkles,
    value: 'Deep Learning',
    label: 'Applied Experience',
    detail: 'TensorFlow · GRU · Model Evaluation',
    color: 'blue',
    animationType: 'scaleIn',
  },
  {
    id: 'ml-projects',
    icon: GitBranch,
    value: '5',
    suffix: '+',
    label: 'ML Projects',
    detail: 'Academic · Research · Applied Projects',
    color: 'purple',
    animationType: 'counter',
    countTo: 5,
  },
  {
    id: 'graduate',
    icon: UsersRound,
    value: '2026',
    label: 'Graduate',
    detail: 'Yudisium completed · Graduation October 2026',
    color: 'pink',
    animationType: 'yearReveal',
  },
];

const HIGHLIGHT_TRANSLATIONS = {
  sinta3: { label: 'Published Research' },
  certificates: { label: 'Certificates' },
  bangkit: { label: 'Bangkit Academy' },
  'ml-focus': { label: 'Primary Focus' },
  'dl-experience': { label: 'Applied Experience' },
  'ml-projects': { label: 'ML Projects', detail: 'Academic · Research · Applied Projects' },
  graduate: { label: 'Graduate', detail: 'Academic requirements completed · Graduation October 2026' },
};

const HIGHLIGHT_TRANSLATIONS_ID = {
  sinta3: { label: 'Penelitian Terpublikasi' },
  certificates: { label: 'Sertifikat' },
  bangkit: { label: 'Bangkit Academy' },
  'ml-focus': { label: 'Fokus Utama' },
  'dl-experience': { label: 'Pengalaman Terapan' },
  'ml-projects': { label: 'Proyek ML', detail: 'Akademik · Riset · Proyek Terapan' },
  graduate: { label: 'Lulusan', detail: 'Persyaratan akademik selesai · Wisuda Oktober 2026' },
};

/* =========================================================
   COLOR SYSTEM
========================================================= */

const colorClasses = {
  cyan: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300',
  blue: 'border-blue-400/30 bg-blue-400/10 text-blue-300',
  purple: 'border-violet-400/30 bg-violet-400/10 text-violet-300',
  pink: 'border-pink-400/30 bg-pink-400/10 text-pink-300',
};

/* =========================================================
   ANIMATION COMPONENTS
========================================================= */

/* Decimal count-up animation for GPA */
function GpaCounter({ value, suffix }) {
  const [displayValue, setDisplayValue] = useState('0.00');
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.6 });
  const target = Number(value);

  useEffect(() => {
    if (!isInView) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(target.toFixed(2));
      return undefined;
    }

    const duration = 3000;
    const startTime = performance.now();
    let frameId;

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue((eased * target).toFixed(2));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target]);

  return (
    <motion.p
      ref={counterRef}
      className="text-xl font-extrabold leading-tight tracking-[-0.04em] text-[#f8fafc] sm:text-2xl"
      initial={{ opacity: 0, y: 6, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      {displayValue}
      {suffix && <span className="ml-1 text-sm text-[#22d3ee] sm:text-base">{suffix}</span>}
    </motion.p>
  );
}

/* Counter Animation - untuk certificates, hours, projects */
function CounterNumber({ countTo, suffix }) {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!isInView) return undefined;

    const duration = 5.0;
    const fps = 60;
    const frames = Math.ceil(duration * fps);
    let currentFrame = 0;

    const timer = setInterval(() => {
      if (currentFrame < frames) {
        const progress = currentFrame / frames;
        const easeOutQuad = 1 - Math.pow(1 - progress, 2);
        setDisplayValue(Math.floor(countTo * easeOutQuad));
        currentFrame++;
      } else {
        setDisplayValue(countTo);
        clearInterval(timer);
      }
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [countTo, isInView]);

  return (
    <motion.p
      ref={counterRef}
      className="text-xl font-extrabold leading-tight tracking-[-0.04em] text-[#f8fafc] sm:text-2xl"
      initial={{ opacity: 0, y: 6, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      {displayValue}
      {suffix && <span className="ml-1 text-sm text-[#22d3ee] sm:text-base">{suffix}</span>}
    </motion.p>
  );
}

/* Text Reveal Animation - untuk Machine Learning */
function TextRevealAnimation({ text }) {
  return (
    <motion.p
      className="text-xl font-extrabold leading-tight tracking-[-0.04em] text-[#f8fafc] sm:text-2xl"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {text}
    </motion.p>
  );
}

/* Year Reveal Animation - untuk Graduate */
function YearRevealAnimation({ year }) {
  return (
    <motion.p
      className="text-xl font-extrabold leading-tight tracking-[-0.04em] text-[#f8fafc] sm:text-2xl"
      initial={{ opacity: 0, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {year}
    </motion.p>
  );
}

/* =========================================================
   HIGHLIGHT CARD
========================================================= */

function HighlightCard({ item, index }) {
  const Icon = item.icon;
  const { lang } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const localizedItem = {
    ...item,
    ...(lang === 'ID'
      ? HIGHLIGHT_TRANSLATIONS_ID[item.id]
      : HIGHLIGHT_TRANSLATIONS[item.id]),
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const renderValueWithAnimation = () => {
    switch (item.animationType) {
      case 'gpaCounter':
        return <GpaCounter value={item.value} suffix={item.suffix} />;
      case 'counter':
        return <CounterNumber countTo={item.countTo} suffix={item.suffix} />;
      case 'textReveal':
        return <TextRevealAnimation text={item.value} />;
      case 'yearReveal':
        return <YearRevealAnimation year={item.value} />;
      case 'scaleIn':
      default:
        return (
          <motion.p
            className="text-xl font-extrabold leading-tight tracking-[-0.04em] text-[#f8fafc] sm:text-2xl"
            initial={{ opacity: 0, scale: 0.72, rotate: -4, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 240, damping: 16, delay: index * 0.08 }}
          >
            {item.value}
            {item.suffix && <span className="ml-1 text-sm text-[#22d3ee] sm:text-base">{item.suffix}</span>}
          </motion.p>
        );
    }
  };

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-[#303449] bg-[linear-gradient(135deg,#252737,#171924)] p-4 shadow-[0_18px_30px_rgba(0,0,0,.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#454a63] sm:p-5"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, rgba(34, 211, 238, 0.14), transparent 80%)`,
        }}
      />

      <div className="relative z-10">
        <motion.span
          className={`inline-flex size-9 items-center justify-center rounded-xl border ${colorClasses[item.color]}`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Icon className="size-4" />
        </motion.span>

        <div className="mt-5">{renderValueWithAnimation()}</div>

        <motion.p
          className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#f472b6]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.12 }}
        >
          {localizedItem.label}
        </motion.p>

        <motion.p
          className="mt-1 text-[11px] leading-4 text-[#aeb8ca]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.14 }}
        >
          {localizedItem.detail}
        </motion.p>
      </div>
    </motion.article>
  );
}

/* =========================================================
   NARRATIVE BLOCK
========================================================= */

function NarrativeBlock({ label, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f39ac7]">
        <span className="h-px w-5 bg-[#e879b6]" />
        {label}
      </p>
      <p className="mt-3 text-sm leading-6 text-[#c3bdd0]">{children}</p>
    </motion.div>
  );
}

/* =========================================================
   CODE PANEL
========================================================= */

const PROFILE_CODE = `// Profile
const nama = 'Hamdika Putra';
const role = 'Machine Learning & Data Science';

function getProfile() {
  return {
    education: 'Informatics · 3.51',
    focus: ['ML', 'Data Science', 'AI', 'Analytics'],
    research: 'JAIC · SINTA 3 · First Author',
    approach: 'Explore · Experiment · Evaluate · Iterate',
  };
}

console.log(getProfile());`;

function CodePanel() {
  return (
    <motion.article
      className="rounded-[18px] bg-[#1e1e1e] p-6 shadow-[0_20px_45px_rgba(0,0,0,.28)] sm:p-9"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <pre className="min-h-[21rem] overflow-x-auto font-mono text-[12px] leading-6 text-[#d7e0ee] sm:text-[13px]">
        <TextType
          as="code"
          text={PROFILE_CODE}
          typingSpeed={10}
          variableSpeed={{ min: 5, max: 18 }}
          initialDelay={250}
          loop={false}
          startOnVisible={true}
          showCursor={true}
          cursorCharacter="▋"
          className="whitespace-pre"
          cursorClassName="ml-0.5 text-[#67e8f9]"
        />
      </pre>
    </motion.article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ToolsSection() {
  const { lang } = useLanguage();
  const content = lang === 'ID'
    ? {
        aboutMe: 'Tentang Saya',
        introOne: 'Saya Hamdika Putra, lulusan Informatika dari Universitas AMIKOM Yogyakarta dengan fokus pada Machine Learning, Data Science, dan Artificial Intelligence. Saya mengerjakan analisis data, visualisasi, pengembangan dashboard, serta keseluruhan alur model—mulai dari eksplorasi dan prapemrosesan hingga evaluasi dan penerapan praktis.',
        introTwo: 'Saya menyelesaikan 900+ jam pelatihan intensif Machine Learning dan AI melalui Bangkit Academy 2024. Riset saya, “Comparative Study of Logistic Regression, Random Forest, and XGBoost for Bank Loan Approval Classification,” diterbitkan pada Journal of Applied Informatics and Computing (JAIC), Vol. 9 No. 5, sebagai penulis pertama.',
        eyebrow: 'Dasar-Dasar',
        title: 'Sosok di Balik Kode',
        tagline: 'Eksplorasi · Eksperimen · Evaluasi · Iterasi',
        who: 'Siapa Saya',
        whoText: 'Saya adalah lulusan Informatika dengan seluruh persyaratan akademik selesai dan menunggu wisuda. Saya berspesialisasi pada Machine Learning, Data Science, dan AI, dengan pengalaman praktik dalam analisis data, visualisasi, pengembangan dashboard, pengembangan model, dan evaluasi.',
        motivates: 'Yang Mendorong Saya',
        motivatesText: 'Saya tertarik pada keseluruhan alur data: mengeksplorasi dan memahami data, membangun visualisasi atau dashboard, melakukan prapemrosesan serta feature engineering, mengembangkan model, membandingkan pendekatan, lalu melakukan iterasi berdasarkan hasilnya.',
        building: 'Hal yang Saya Bangun',
        buildingText: 'Saya membangun proyek data dan AI di berbagai domain: riset klasifikasi persetujuan pinjaman bank yang telah dipublikasikan, peramalan harga emas berbasis GRU, analisis konsumsi listrik nasional dan efisiensi energi, prediksi Lumpy Skin Disease dengan Random Forest, prediksi emisi CO₂ kendaraan, serta aplikasi J-Go dari Bangkit. Saya menghargai alur end-to-end dari data mentah menjadi insight yang bermakna.',
        heading: 'Tujuan Saya',
        headingText: 'Saya ingin memperdalam keahlian pada aplikasi Machine Learning, Data Science, dan AI, khususnya ketika analisis, visualisasi, dan model prediktif dapat mendukung keputusan praktis. Saya aktif mencari peluang untuk berkontribusi, berkolaborasi, dan terus belajar melalui pekerjaan nyata.',
        availability: 'Terbuka untuk peluang entry-level',
      }
    : {
        aboutMe: 'About Me',
        introOne: 'I am Hamdika Putra, an Informatics graduate from Universitas AMIKOM Yogyakarta focusing on Machine Learning, Data Science, and Artificial Intelligence. I work across data analysis, visualization, dashboard development, and the complete model workflow—from exploration and preprocessing to evaluation and practical applications.',
        introTwo: 'I completed 900+ hours of intensive Machine Learning and AI training through Bangkit Academy 2024. My research, “Comparative Study of Logistic Regression, Random Forest, and XGBoost for Bank Loan Approval Classification,” was published in the Journal of Applied Informatics and Computing (JAIC), Vol. 9 No. 5, as first author.',
        eyebrow: 'The Basics',
        title: 'The Person Behind the Code',
        tagline: 'Explore · Experiment · Evaluate · Iterate',
        who: 'Who I Am',
        whoText: 'I am an Informatics graduate with all academic requirements completed and graduation ceremony ahead. I specialize in Machine Learning, Data Science, and AI, with hands-on experience in data analysis, visualization, dashboard development, model development, and evaluation.',
        motivates: 'What Motivates Me',
        motivatesText: 'I’m driven by the complete data workflow: exploring and understanding data, building visualizations or dashboards, preprocessing and feature engineering, developing models, comparing approaches, and iterating from the results.',
        building: 'What I Enjoy Building',
        buildingText: 'I build data and AI projects across diverse domains: published bank loan approval classification research, GRU-based gold price forecasting, national electricity and energy-efficiency analysis, Random Forest prediction for Lumpy Skin Disease, vehicle CO₂ prediction, and the J-Go application from Bangkit. I value end-to-end workflows from raw data to meaningful insights.',
        heading: "Where I'm Heading",
        headingText: 'I aim to deepen my expertise in Machine Learning, Data Science, and AI applications, especially where analysis, visualization, and predictive models can support practical decisions. I’m actively seeking opportunities to contribute, collaborate, and keep learning through real-world work.',
        availability: 'Open to entry-level opportunities',
      };

  return (
    <motion.section
      id="tools"
      className="theme-section w-full bg-[#08090b] px-5 py-16 text-[#f8fafc] sm:px-8 lg:px-12 lg:py-20 xl:px-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            INTRO SECTION
        ====================================================== */}

        <div className="grid items-center gap-10 border-b border-[#20232a] pb-14 lg:grid-cols-[1.25fr_.9fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-[#f8fafc]">
              <UserRound className="size-5 text-[#3b82f6]" />
              {content.aboutMe}
            </h2>
            <p className="mt-6 max-w-2xl text-justify text-sm leading-6 text-[#b6c1d4] sm:text-[15px]">
              {content.introOne}
            </p>
            <p className="mt-4 max-w-2xl text-justify text-sm leading-6 text-[#b6c1d4] sm:text-[15px]">
              {content.introTwo}
            </p>
          </motion.div>
          <CodePanel />
        </div>

        {/* =====================================================
            ABOUT HEADER
        ====================================================== */}

        <motion.header
          className="mt-16 border-b-2 border-transparent pb-4 [border-image:linear-gradient(90deg,#22d3ee,#e879b6)_1]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f39ac7]">
            <span className="h-px w-6 bg-[#e879b6]" />
            {content.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-extrabold leading-none tracking-[-0.06em] text-[#f8fafc] sm:text-5xl lg:text-6xl">
            {content.title}
          </h2>
          <p className="mt-4 text-sm font-medium text-[#d8cae4]">
            {content.tagline}
          </p>
        </motion.header>

        {/* =====================================================
            HIGHLIGHTS + NARRATIVE
        ====================================================== */}

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_.92fr] lg:gap-14">
          {/* Highlight cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {HIGHLIGHTS.map((item, index) => (
              <HighlightCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Narrative */}
          <div className="space-y-7 lg:pt-1">
            <NarrativeBlock label={content.who}>
              {content.whoText}
            </NarrativeBlock>

            <NarrativeBlock label={content.motivates}>
              {content.motivatesText}
            </NarrativeBlock>

            <NarrativeBlock label={content.building}>
              {content.buildingText}
            </NarrativeBlock>

            <NarrativeBlock label={content.heading}>
              {content.headingText}
            </NarrativeBlock>

            <motion.div
              className="flex flex-wrap items-center gap-3 pt-1 text-xs font-semibold"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="rounded-full bg-[#590f66] px-4 py-2 text-[#fce7f3]">
                <span className="mr-2 text-[#f9a8d4]">●</span>
                {content.availability}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#c8b3d4]">
                <MapPin className="size-3.5 text-[#e879b6]" />
                Yogyakarta, Indonesia
              </span>
            </motion.div>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
