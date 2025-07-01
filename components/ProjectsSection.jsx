// components/ProjectsSection.jsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: 'Desain Aplikasi Mobile E-commerce',
    description: 'Perancangan ulang UI/UX lengkap untuk aplikasi belanja online, berfokus pada kemudahan navigasi dan pengalaman pengguna yang lancar.',
    imageUrl: '/images/project1.jpg',
    tags: ['UI/UX Design', 'Mobile App', 'Figma'],
    liveLink: 'https://dribbble.com/your-project-link-1',
    repoLink: 'https://github.com/yourusername/your-repo-link-1',
  },
  {
    id: 2,
    title: 'Website Portofolio Interaktif',
    description: 'Mengembangkan website portofolio responsif dengan animasi Framer Motion dan integrasi CMS headless untuk pengelolaan konten yang mudah.',
    imageUrl: '/images/project2.jpg',
    tags: ['Web Development', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    liveLink: 'https://nama-website-anda.com/project-2',
    repoLink: 'https://github.com/yourusername/your-repo-link-2',
  },
  {
    id: 3,
    title: 'Sistem Manajemen Klinik Online',
    description: 'Membangun dashboard admin untuk manajemen pasien, janji temu, dan rekam medis digital, meningkatkan efisiensi operasional klinik.',
    imageUrl: '/images/project3.jpg',
    tags: ['Fullstack Development', 'React', 'Node.js', 'MongoDB'],
    liveLink: null,
    repoLink: 'https://github.com/yourusername/your-repo-link-3',
  },
];

const ProjectsSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Karya Pilihan Saya
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative w-full h-56">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 text-base mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-teal-700 text-teal-100 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-start gap-4">
                  {project.liveLink && (
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:text-teal-300 font-medium transition duration-300 flex items-center gap-1"
                    >
                      Lihat Live{' '}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  )}
                  {project.repoLink && (
                    <Link
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white font-medium transition duration-300 flex items-center gap-1"
                    >
                      GitHub Repo{' '}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;