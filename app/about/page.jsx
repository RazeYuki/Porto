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
            src="/images/profile.jpg"
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold text-center">Hi, I'm Hamdika Putra</h1>
          <p className="text-sm text-center text-secondary-text mt-2">
            A Machine Learning Enthusiast and Frontend Developer passionate about building smart and interactive digital solutions.
          </p>
          <a
            href="https://drive.google.com/file/d/1iDmuU2lcHynCsv5ZvA_wh5NiQXcie-e-/view?usp=drive_link"
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
              href: 'mailto:hmdkaptr@gmail.com',
              icon: <Mail size={36} />,
              bg: 'bg-gradient-to-tr from-green-300 to-red-600 hover:to-red-700 text-white'
            },
            {
              href: 'https://www.instagram.com/hmdkaptr_/',
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
            I’m a final-year <strong>Informatics student</strong> at Universitas Amikom Yogyakarta, with a specialization in <strong>Big Data Analytics</strong>.
            I'm deeply passionate about <strong>Machine Learning</strong>, <strong>Artificial Intelligence</strong>, and <strong>Frontend Development</strong>.
          </p>
          <p className="mt-4">
            My interests lie in combining intelligent systems with intuitive design using tools like <code className="text-accent-light">React</code>, <code className="text-accent-light">Next.js</code>, <code className="text-accent-light">Framer Motion</code>, and <code className="text-accent-light">TensorFlow</code>.
            I thrive on learning and building applications that are both smart and visually compelling.
          </p>
        </div>

        {/* Experience Section */}
        <div className="md:col-span-2 bg-secondary-bg p-6 rounded-xl shadow border border-border-primary">
          <h2 className="text-lg font-bold mb-4">Experience</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between border-b pb-2 border-border-primary">
              <div>
                <strong>Bangkit Academy </strong> <br />
                <span className="text-secondary-text">Machine Learning Cohort 2024</span>
              </div>
              <span className="text-secondary-text">September 2024 – Desember 2024</span>
            </li>
            <li className="flex justify-between border-b pb-2 border-border-primary">
              <div>
                <strong>Himpunan Mahasiswa Informatika (HMIF)</strong> <br />
                <span className="text-secondary-text">Hubungan Masyarakat</span>
              </div>
              <span className="text-secondary-text">Februari 2023 – September 2024</span>
            </li>
           {/* <li className="flex justify-between">
              <div>
                <strong>Freelance Project</strong> <br />
                <span className="text-secondary-text">Various small UI/UX jobs</span>
              </div>
              <span className="text-secondary-text">Ongoing</span>
            </li> */}
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
