'use client';

import { motion } from 'framer-motion';

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Download,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Orbit,
} from 'lucide-react';

import ProfileCard from '@/components/reactbits/ProfileCard';
import ChromaGrid from '@/components/reactbits/ChromaGrid';
import { useLanguage } from '@/components/providers/LanguageProvider';

/* =========================================================
   SKILL TRACKS
========================================================= */

const SKILL_TRACKS = [
  {
    no: '01',
    label: 'Model development',
    accent: 'cyan',

    items: [
      'Python',
      'TensorFlow',
      'Machine Learning',
      'Deep Learning',
      'Pandas',
      'Scikit-learn',
      'NumPy',
    ],
  },

  {
    no: '02',
    label: 'Data & insight',
    accent: 'violet',

    items: [
      'Data Analysis',
      'Data Visualization',
      'Power BI',
      'Looker Studio',
      'Microsoft Excel',
      'Dashboard Development',
    ],
  },

  {
    no: '03',
    label: 'Practical tools',
    accent: 'pink',

    items: [
      'Streamlit',
      'MySQL',
      'IBM Granite / GenAI',
      'Google Cloud',
      'Git',
      'Figma',
    ],
  },
];

/* =========================================================
   CONNECT ITEMS
========================================================= */

const CONNECT_ITEMS = [
  {
    label: 'GitHub',
    icon: <Github />,
    url: 'https://github.com/RazeYuki',
    borderColor: 'rgba(148, 163, 184, 0.45)',
  },

  {
    label: 'LinkedIn',
    icon: <Linkedin />,
    url: 'https://www.linkedin.com/in/hamdika-putra-8a9b5629a/',
    borderColor: 'rgba(148, 163, 184, 0.45)',
  },

  {
    label: 'Instagram',
    icon: <Instagram />,
    url: 'https://www.instagram.com/hmdkaptr_/',
    borderColor: 'rgba(148, 163, 184, 0.45)',
  },

  {
    label: 'Email',
    icon: <Mail />,
    url: 'https://mail.google.com/mail/?view=cm&fs=1&to=hmdkaptr@gmail.com',
    borderColor: 'rgba(148, 163, 184, 0.45)',
  },
];

/* =========================================================
   TRACK COLORS
========================================================= */

const trackAccent = {
  cyan:
    'border-cyan-300/35 bg-cyan-300 text-cyan-200',

  violet:
    'border-violet-300/35 bg-violet-300 text-violet-200',

  pink:
    'border-pink-300/35 bg-pink-300 text-pink-200',
};

/* =========================================================
   SIGNAL LABEL
========================================================= */

function SignalLabel({
  children,
  className = '',
}) {
  return (
    <p
      className={`
        flex
        items-center
        gap-2
        text-[10px]
        font-bold
        uppercase
        tracking-[0.2em]
        text-[#8fa4c1]
        ${className}
      `}
    >
      <span
        className="
          size-1.5
          rounded-full
          bg-sky-300
          shadow-[0_0_10px_#7dd3fc]
        "
      />

      {children}
    </p>
  );
}

/* =========================================================
   PROFILE
========================================================= */

function ProfileColumn() {
  const { lang } = useLanguage();

  return (
    <section
      className="
        flex
        min-h-full
        flex-col
        px-1
        py-2
        sm:px-3
        lg:pr-8
      "
    >
      <div>
        <SignalLabel>
          {lang === 'ID' ? 'Sinyal profil / 2026' : 'Profile signal / 2026'}
        </SignalLabel>

        <div
          className="
            mt-7
            flex
            justify-center
            lg:justify-start
          "
        >
          <ProfileCard
            avatarUrl="/images/profile.jpg"
            name="Hamdika Putra"
            title="Machine Learning / Data Science / AI"
            handle="hmdkaptr_"
            status="Available to collaborate"
            contactText="Contact"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            behindGlowEnabled={true}
            behindGlowColor="rgba(56, 189, 248, 0.50)"
            behindGlowSize="65%"
            innerGradient="
              linear-gradient(
                145deg,
                rgba(56,189,248,0.15) 0%,
                rgba(129,140,248,0.08) 50%,
                rgba(0,0,0,0) 100%
              )
            "
          />
        </div>

        {/* LOCATION */}

        <p
          className="
            mt-4
            flex
            items-center
            gap-2
            text-xs
            text-[#91a3bc]
          "
        >
          <MapPin
            className="
              size-3.5
              text-sky-300
            "
          />

          Yogyakarta, Indonesia
        </p>

        {/* DESCRIPTION */}

        <p
          className="
            mt-7
            text-sm
            leading-6
            text-[#b9c8db]
          "
        >
          {lang === 'ID'
            ? 'Lulusan Informatika yang menikmati menemukan pola dari data, menguji ide, lalu mengubah analisis menjadi insight dan solusi praktis.'
            : 'An Informatics graduate who enjoys finding patterns in data, testing ideas, and turning analysis into useful insights and practical solutions.'}
        </p>
      </div>

      {/* STATUS */}

      <div
        className="
          mt-10
          max-w-sm
          space-y-3
          border-t
          border-[#26344b]
          pt-5
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            text-xs
          "
        >
          <span className="text-[#91a3bc]">
            {lang === 'ID' ? 'Status' : 'Status'}
          </span>

          <span
            className="
              font-bold
              text-emerald-300
            "
          >
            {lang === 'ID' ? 'Tersedia untuk berkolaborasi' : 'Available to collaborate'}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            justify-between
            text-xs
          "
        >
          <span className="text-[#91a3bc]">
            {lang === 'ID' ? 'Mode' : 'Mode'}
          </span>

          <span
            className="
              font-bold
              text-white
            "
          >
            Explore → Improve
          </span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SKILLS
========================================================= */

function SkillsColumn() {
  const { lang } = useLanguage();
  const translatedTracks = lang === 'ID'
    ? [
        { label: 'Pengembangan model', items: ['Python', 'TensorFlow', 'Machine Learning', 'Deep Learning', 'Pandas', 'Scikit-learn', 'NumPy'] },
        { label: 'Data & insight', items: ['Analisis Data', 'Visualisasi Data', 'Power BI', 'Looker Studio', 'Microsoft Excel', 'Pengembangan Dashboard'] },
        { label: 'Perangkat praktis', items: ['Streamlit', 'MySQL', 'IBM Granite / GenAI', 'Google Cloud', 'Git', 'Figma'] },
      ]
    : SKILL_TRACKS;
  return (
    <section
      className="
        relative
        px-1
        py-2
        sm:px-3
        lg:border-x
        lg:border-[#26344b]
        lg:px-8
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-5
        "
      >
        <div>
          <SignalLabel>
            {lang === 'ID' ? 'Peta kapabilitas' : 'Capabilities atlas'}
          </SignalLabel>

          <h2
            className="
              mt-4
              text-3xl
              font-extrabold
              tracking-[-0.06em]
              text-white
            "
          >
            {lang === 'ID' ? 'Jalur keahlian' : 'Skill tracks'}
          </h2>
        </div>

        <Orbit
          className="
            mt-1
            size-7
            text-violet-300
          "
        />
      </div>

      <p
        className="
          mt-4
          max-w-md
          text-sm
          leading-6
          text-[#9eafc5]
        "
      >
        {lang === 'ID'
          ? 'Koleksi alat dan pola kerja yang saya gunakan untuk bereksperimen, menganalisis data, dan membangun produk praktis berbasis data.'
          : 'A collection of tools and working patterns I use to experiment, analyze data, and build practical data-driven products.'}
      </p>

      <div className="mt-9 space-y-7">
        {SKILL_TRACKS.map(
          ({
            no,
            label: originalLabel,
            accent,
            items: originalItems,
          }, trackIndex) => {
            const { label, items } = translatedTracks[trackIndex] || {
              label: originalLabel,
              items: originalItems,
            };
            const borderText =
              trackAccent[accent]
                .split(' ')
                .filter(
                  (item) =>
                    item.startsWith('border-') ||
                    item.startsWith('text-')
                )
                .join(' ');

            const background =
              trackAccent[accent]
                .split(' ')
                .find((item) =>
                  item.startsWith('bg-')
                );

            return (
              <article key={label}>
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <span
                    className={`
                      grid
                      size-7
                      place-items-center
                      rounded-full
                      border
                      bg-transparent
                      font-mono
                      text-[10px]
                      ${borderText}
                    `}
                  >
                    {no}
                  </span>

                  <h3
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-[#dbe8f9]
                    "
                  >
                    {label}
                  </h3>

                  <span
                    className={`
                      h-px
                      flex-1
                      opacity-50
                      ${background}
                    `}
                  />
                </div>

                <div
                  className="
                    mt-3
                    flex
                    flex-wrap
                    gap-x-3
                    gap-y-2
                    pl-10
                  "
                >
                  {items.map(
                    (item, index) => (
                      <span
                        key={`${label}-${item}`}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          text-xs
                          font-medium
                          text-[#aebed3]
                        "
                      >
                        <span
                          className={`
                            size-1
                            rounded-full
                            ${
                              index % 2 === 0
                                ? background
                                : 'bg-[#52647d]'
                            }
                          `}
                        />

                        {item}
                      </span>
                    )
                  )}
                </div>
              </article>
            );
          }
        )}
      </div>

      {/* QUOTE */}

      <div
        className="
          mt-10
          rounded-r-2xl
          border-l-2
          border-violet-300
          bg-violet-300/5
          px-5
          py-4
          text-sm
          italic
          leading-6
          text-[#b9add3]
        "
      >
        {lang === 'ID'
          ? '“Kemajuan datang dari eksperimen yang dievaluasi, bukan asumsi yang tidak diuji.”'
          : '“Progress comes from evaluated experiments, not assumptions left untested.”'}
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT
========================================================= */

function ContactColumn() {
  const { lang } = useLanguage();

  return (
    <section
      className="
        flex
        flex-col
        px-1
        py-2
        sm:px-3
        lg:px-7
      "
    >
      <SignalLabel>
        {lang === 'ID' ? 'Kanal terbuka' : 'Open channel'}
      </SignalLabel>

      <h2
        className="
          mt-4
          text-3xl
          font-extrabold
          tracking-[-0.06em]
          text-white
        "
      >
        {lang === 'ID' ? 'Mari terhubung.' : "Let's connect."}
      </h2>

      <p
        className="
          mt-4
          text-sm
          leading-6
          text-[#9eafc5]
        "
      >
        {lang === 'ID'
          ? 'Untuk kolaborasi, diskusi proyek, atau peluang awal karier, hubungi saya melalui kanal berikut.'
          : 'For collaboration, project discussions, or early-career opportunities, reach me through the channels below.'}
      </p>

      {/* =================================================
          CONNECT LOGOS
      ================================================= */}

      <div className="mt-5 w-full">
        <ChromaGrid
          items={CONNECT_ITEMS}
          radius={180}
          columns={2}
          rows={2}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
          className="w-full"
        />
      </div>

      {/* =================================================
          NEXT MOVE
      ================================================= */}

      <div className="mt-auto pt-8">
        <p
          className="
            mb-3
            text-[10px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-[#8fa4c1]
          "
        >
          {lang === 'ID' ? 'Langkah berikutnya' : 'Next move'}
        </p>

        <a
          href="/images/CVnew.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            bg-[linear-gradient(105deg,#38bdf8,#818cf8)]
            px-5
            py-4
            text-sm
            font-extrabold
            text-[#07111e]
            transition
            hover:brightness-110
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-2
            "
          >
            <Download className="size-4" />

            {lang === 'ID' ? 'Unduh Resume' : 'Download Resume'}
          </span>

          <ArrowUpRight className="size-4" />
        </a>

        <a
          href="#projects"
          className="
            mt-3
            flex
            items-center
            justify-between
            border-b
            border-[#314158]
            px-1
            py-3
            text-xs
            font-bold
            text-[#dbeafe]
            transition
            hover:border-sky-300
            hover:text-sky-200
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-2
            "
          >
            <BriefcaseBusiness
              className="size-3.5"
            />

            {lang === 'ID' ? 'Lihat proyek pilihan' : 'See selected work'}
          </span>

          <ArrowUpRight
            className="size-3.5"
          />
        </a>
      </div>
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AboutPageContent() {
  return (
    <main
      className="
        about-page
        theme-section
        w-full
        bg-[#08090b]
        px-5
        py-16
        text-[#f8fafc]
        sm:px-8
        lg:px-12
        lg:py-24
        xl:px-20
      "
    >
      <motion.section
        className="
          mx-auto
          w-full
          max-w-7xl
        "
        initial={{
          opacity: 0,
          y: 16,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        {/* TOP BAR */}

        <div
          className="
            mb-8
            flex
            items-center
            justify-between
            border-y
            border-[#26344b]
            py-3
            text-[10px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-[#8296b3]
          "
        >
          <span>
            Hamdika Putra — Field Notes
          </span>

          <span className="text-sky-300">
            Independent portfolio / 2026
          </span>
        </div>

        {/* MAIN GRID */}

        <div
          className="
            grid
            gap-8
            lg:grid-cols-[.92fr_1.18fr_.9fr]
            lg:gap-0
          "
        >
          <ProfileColumn />

          <SkillsColumn />

          <ContactColumn />
        </div>
      </motion.section>
    </main>
  );
}
