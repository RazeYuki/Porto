'use client';

import React from 'react';

const QuoteSection = () => {
  return (
    <section className="relative min-h-[80vh] w-full bg-primary-bg text-primary-text px-4 py-24 flex items-start justify-center overflow-hidden">
      {/* Background Text "QUOTE" */}
      <h1 className="absolute text-[30vw] font-black text-[#0000000a] dark:text-[#ffffff0a] select-none leading-none tracking-tight z-0 top-0 left-1/2 -translate-x-1/2">
        QUOTE
      </h1>

      {/* Quote Content */}
      <div className="relative z-10 max-w-3xl text-center flex flex-col items-center">
        {/* Tanda Kutip Besar */}
        <div className="text-7xl md:text-9xl font-bold mb-4 text-accent-light leading-none">
          “
        </div>

        {/* Isi Kutipan */}
        <p className="text-xl md:text-2xl font-medium text-secondary-text italic leading-relaxed">
          Setiap baris kode adalah bagian dari cerita. Bukan hanya soal fungsi, tapi juga tentang pengalaman yang kita bangun bersama.
        </p>

        {/* Nama Penulis */}
        <span className="mt-6 text-sm md:text-base text-accent-light font-semibold tracking-wide uppercase">
          — Hamdika Putra
        </span>
      </div>
    </section>
  );
};

export default QuoteSection;
