'use client';

import dynamic from 'next/dynamic';

import RunningText from '@/components/features/RunningText';
import DecryptedText from '@/components/reactbits/DecryptedText';
import { useLanguage } from '@/components/providers/LanguageProvider';

const Scanner = dynamic(
  () =>
    import(
      '@/components/features/Scanner'
    ),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function HeroSection() {
  const { lang } = useLanguage();
  const content = lang === 'ID'
    ? {
        greeting: 'Halo, saya Hamdika!',
        subtitle: 'Lulusan Informatika dengan fokus pada Machine Learning / Data Science / AI',
      }
    : {
        greeting: "Hello, I'm Hamdika!",
        subtitle: 'Informatics Graduate focused on Machine Learning / Data Science / AI',
      };

  return (
    <section
      id="hero"
      className="
        relative
        isolate
        min-h-screen
        w-screen
        overflow-hidden
        snap-start
      "
    >
      {/* ==================================================
          SCANNER
          ================================================== */}

      <Scanner
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          opacity-80
        "
        color1="#3100f0"
        color2="#ffbffd"
        color3="#ffffff"
        speed={0.42}
        sweepSpeed={0.22}
        sweepWidth={1.6}
        sweepFalloff={1.8}
        frequency={2}
        ripple={0.2}
        bandDensity={8}
        lineSharpness={2.8}
        glow={0.38}
        brightness={0.88}
        contrast={1.05}
        opacity={0.78}
        vignette={0.58}
        mouseInteraction={false}
      />

      {/* ==================================================
          HERO TEXT
          ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[27%]
          z-30
          px-4
          text-center
        "
      >
        {/* ==================================================
            TITLE
            ================================================== */}

        <h1
          className="
            text-4xl
            font-extrabold
            leading-tight
            text-primary-text
            md:text-6xl
          "
        >
          <DecryptedText
            key={content.greeting}
            text={content.greeting}
            animateOn="preloader"
            triggerOnce={false}
            sequential={true}
            revealDirection="center"
            speed={80}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
            className="
              text-primary-text
            "
            encryptedClassName="
              text-primary-text
            "
            parentClassName="
              inline-block
            "
          />
        </h1>

        {/* ==================================================
            SUBTITLE
            ================================================== */}

        <p
          className="
            mt-3
            text-xl
            text-secondary-text
            md:text-2xl
          "
        >
          <DecryptedText
            key={content.subtitle}
            text={content.subtitle}
            animateOn="preloader"
            triggerOnce={false}
            sequential={true}
            revealDirection="start"
            speed={45}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
            className="
              text-secondary-text
            "
            encryptedClassName="
              text-secondary-text
            "
            parentClassName="
              inline-block
            "
          />
        </p>
      </div>

      {/* ==================================================
          RUNNING TEXT
          ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[58%]
          z-10
          w-full
          -translate-y-1/2
          overflow-hidden
          py-8
          opacity-70
        "
      >
        <RunningText
          textContent="MACHINE LEARNING / AI"
          speed={150}
          direction="right"
          fontSizeClass="
            text-[12vw]
            md:text-[8vw]
          "
          accentOrbs
        />

        <RunningText
          textContent="DEEP LEARNING · EXPERIMENT · ITERATE"
          speed={150}
          direction="left"
          fontSizeClass="
            text-[12vw]
            md:text-[8vw]
          "
          accentOrbs
        />
      </div>
    </section>
  );
}
