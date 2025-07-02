'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <main className="min-h-screen w-full bg-primary-bg text-primary-text px-4 py-12 flex justify-center items-start">
      <motion.div
        className="w-full max-w-5xl grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Profile Card */}
        <div className="bg-secondary-bg p-6 rounded-xl shadow border border-border-primary flex flex-col items-center justify-center">
          <Image
            src="/profile.jpg"
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold text-center">Hi, I'm Hamdika Putra</h1>
          <p className="text-sm text-center text-secondary-text mt-2">
            I build interfaces & digital experiences.
          </p>
          <a
            href="/resume.pdf"
            target="_blank"
            className="mt-4 px-4 py-2 border border-accent-light rounded-lg text-accent-light text-sm hover:bg-accent-light hover:text-primary-bg transition"
          >
            Resume / CV
          </a>
        </div>

        {/* Social Media Grid */}
        <div className="md:col-span-1 grid grid-cols-2 gap-4">
          {[
            {
              href: 'mailto:hamdikaputra@example.com',
              icon: <Mail size={36} />,
              bg: 'bg-gradient-to-tr from-green-300 to-red-600 hover:to-red-700 text-white'
            },
            {
              href: 'https://www.instagram.com/yourusername',
              icon: <Instagram size={36} />,
              bg: 'bg-gradient-to-tr from-pink-500 via-red-400 to-yellow-400 text-white'
            },
            {
              href: 'https://github.com/RazeYuki',
              icon: <Github size={36} />,
              bg: 'bg-gradient-to-tr from-gray-700 via-gray-900 to-black text-white'
            },
            {
              href: 'https://www.linkedin.com/in/hamdika-putra-8a9b5629a/',
              icon: <Linkedin size={36} />,
              bg: 'bg-blue-600 hover:bg-blue-700 text-white'
            }
          ].map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-xl shadow flex items-center justify-center aspect-square ${item.bg} transition`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
            </motion.a>
          ))}
        </div>

        {/* About Description */}
        <div className="md:col-span-2 bg-secondary-bg p-6 rounded-xl shadow border border-border-primary text-base leading-relaxed">
          <p>
            I’m a final-year <strong>Informatics student</strong> at Universitas Amikom Yogyakarta, deeply passionate
            about <strong>Frontend Development</strong> and UI/UX Design. My focus is building performant, clean, and delightful web experiences
            using modern frameworks like <code className="text-accent-light">React</code>, <code className="text-accent-light">Next.js</code>, and <code className="text-accent-light">Framer Motion</code>.
          </p>
          <p className="mt-4">
            I also enjoy learning design systems, contributing to small creative projects, and continuously exploring the intersection of technology and aesthetics.
          </p>
        </div>

        {/* Experience Section */}
        <div className="md:col-span-2 bg-secondary-bg p-6 rounded-xl shadow border border-border-primary">
          <h2 className="text-lg font-bold mb-4">Experience</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between border-b pb-2 border-border-primary">
              <div>
                <strong>Aern Store</strong> <br />
                <span className="text-secondary-text">Co-Founder</span>
              </div>
              <span className="text-secondary-text">Mar 2023 – Present</span>
            </li>
            <li className="flex justify-between border-b pb-2 border-border-primary">
              <div>
                <strong>Programming Tadsikode</strong> <br />
                <span className="text-secondary-text">Development Team</span>
              </div>
              <span className="text-secondary-text">Jan 2025 – Present</span>
            </li>
            <li className="flex justify-between">
              <div>
                <strong>Freelance Project</strong> <br />
                <span className="text-secondary-text">Various small UI/UX jobs</span>
              </div>
              <span className="text-secondary-text">Ongoing</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="md:col-span-2 flex flex-col md:flex-row justify-between items-center mt-6 text-xs text-secondary-text">
          <span>📍 Yogyakarta, Indonesia</span>
          <span className="mt-2 md:mt-0">Let’s build something great together.</span>
        </div>
      </motion.div>
    </main>
  );
};

export default AboutPage;
