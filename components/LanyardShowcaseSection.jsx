'use client';

import { motion, useReducedMotion } from 'framer-motion';
import InteractiveLanyard from './InteractiveLanyard';

export default function LanyardShowcaseSection() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { amount: 0.32, once: true },
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <section
      id="lanyard"
      aria-labelledby="lanyard-showcase-title"
      className="relative isolate flex min-h-screen snap-start items-center overflow-hidden bg-[#030807] px-5 py-20 text-white sm:px-8 md:px-12 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary-bg via-primary-bg/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-primary-bg" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_73%_43%,rgba(20,110,94,0.23),transparent_24rem),radial-gradient(circle_at_18%_64%,rgba(45,212,191,0.09),transparent_21rem)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:52px_52px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-[0.82fr_1.18fr] md:gap-12">
        <motion.div {...reveal} className="max-w-md pt-8 md:pt-0">
          <p className="mb-5 text-[10px] font-bold tracking-[0.28em] text-teal-200/75 sm:text-xs">
            INTERACTIVE OBJECT / 01
          </p>
          <h2 id="lanyard-showcase-title" className="text-4xl font-extrabold leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl md:text-6xl">
            A card you
            <br />
            can feel.
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60 sm:text-base">
            Pull it gently. The card, connector, and lanyard react together—just like an object suspended in space.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[10px] font-semibold tracking-[0.08em] text-teal-50/80 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal-200/55" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-100" />
            </span>
            DRAG TO PLAY
          </div>
        </motion.div>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: shouldReduceMotion ? 0 : 0.12 }} className="relative flex min-h-[440px] items-start justify-center sm:min-h-[540px] md:min-h-[670px] md:justify-end">
          <div className="h-[440px] w-[278px] sm:h-[540px] sm:w-[342px] md:h-[670px] md:w-[420px]">
            <InteractiveLanyard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
