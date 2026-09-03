'use client';

import { motion } from 'framer-motion';
import TextType from '@/components/reactbits/TextType';
import { useLanguage } from '@/components/providers/LanguageProvider';

const QUOTES = {
  EN: `Technology is more than code that runs flawlessly.
It is a new language for building ideas, connecting possibilities,
and improving lives—one thoughtful solution can create a meaningful impact.`,
  ID: `Teknologi lebih dari sekadar kode yang berjalan sempurna.
Teknologi adalah bahasa baru untuk membangun ide, menghubungkan berbagai kemungkinan,
dan memberi dampak—satu solusi yang dirancang dengan baik dapat membawa perubahan berarti.`,
};

export default function QuoteSection() {
  const { lang } = useLanguage();

  return (
    <section
      className="
        relative
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-primary-bg
        px-4
        py-24
        text-primary-text
      "
    >
      {/* ==================================================
          BACKGROUND TEXT
          ================================================== */}

      <h1
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          z-0
          -translate-x-1/2
          select-none
          text-[28vw]
          font-black
          leading-none
          tracking-tight
          text-[#ffffff06]
        "
      >
        QUOTES
      </h1>

      {/* ==================================================
          CONTENT
          ================================================== */}

      <div
        className="
          relative
          z-10
          flex
          w-full
          max-w-4xl
          flex-col
          items-center
          text-center
        "
      >
        {/* ==================================================
            QUOTE MARK
            ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: 'easeOut',
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            mb-8
            text-7xl
            font-bold
            leading-none
            text-accent-light
            md:text-9xl
          "
        >
          “
        </motion.div>

        {/* ==================================================
            TYPING QUOTE
            ================================================== */}

        <div
          className="
            w-full
            text-lg
            font-medium
            italic
            leading-[1.8]
            text-secondary-text
            md:text-2xl
            md:leading-[1.8]
          "
        >
          <TextType
            key={lang}
            text={QUOTES[lang]}
            typingSpeed={30}
            initialDelay={500}
            pauseDuration={999999}
            deletingSpeed={30}
            loop={false}
            showCursor={true}
            hideCursorWhileTyping={false}
            cursorCharacter="|"
            cursorBlinkDuration={0.5}
            startOnVisible={true}
            className="
              w-full
            "
            cursorClassName="
              ml-1
              text-accent-light
              not-italic
            "
          />
        </div>

        {/* ==================================================
            AUTHOR
            ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
          viewport={{
            once: true,
            amount: 0.6,
          }}
          className="
            mt-12
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              h-[3px]
              w-8
              bg-accent-light
            "
          />

          <span
            className="
              text-2xl
              font-extrabold
              uppercase
              tracking-[0.12em]
              text-accent-light
              md:text-3xl
            "
          >
            Hamdika Putra
          </span>
        </motion.div>
      </div>
    </section>
  );
}
