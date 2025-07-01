// components/AboutSection.jsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-800 text-gray-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          className="md:w-1/3 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/images/profile.jpg"
            alt="Profil Nama Anda"
            width={300}
            height={300}
            className="rounded-full object-cover w-64 h-64 md:w-80 md:h-80 border-4 border-teal-500 shadow-xl"
          />
        </motion.div>
        <motion.div
          className="md:w-2/3 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">Tentang Saya</h2>
          <p className="text-lg leading-relaxed mb-4">
            Halo! Saya [Nama Anda], seorang <span className="font-semibold text-white">[Profesi Anda, misal: Web Developer dengan spesialisasi di frontend dan desain UI/UX]</span>. Saya memiliki passion dalam menciptakan solusi digital yang indah dan fungsional.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Dengan latar belakang di [Sebutkan latar belakang/pendidikan/pengalaman, misal: ilmu komputer dan seni grafis], saya suka memecahkan masalah kompleks dan mengubahnya menjadi pengalaman pengguna yang intuitif dan menarik. Saya terbiasa bekerja dengan teknologi modern seperti React, Next.js, dan Tailwind CSS.
          </p>
          <p className="text-lg leading-relaxed">
            Di luar coding, saya suka [Hobi/minat Anda, misal: membaca buku, menjelajahi alam, atau bermain musik]. Saya selalu mencari tantangan baru dan kesempatan untuk belajar dan berkembang. Mari kita berkolaborasi!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;