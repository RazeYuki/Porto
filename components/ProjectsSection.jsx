'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: 'AernStore Feedback System',
    image: '/images/aern.jpg',
  },
  {
    title: 'Roasting HP GPT',
    image: '/images/roastinghp.jpg',
  },
  {
    title: 'Keluh Kesah App',
    image: '/images/keluhkesah.jpg',
  },
  {
    title: 'Portofolio Website',
    image: '/images/portofolio.jpg',
  },
  {
    title: 'Machine Learning Loan Classifier',
    image: '/images/loanml.jpg',
  },
];

const ProjectSection = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full px-6 py-24 bg-primary-bg text-primary-text flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Title */}
      <h1 className="absolute text-[24vw] font-black text-[#0000000a] dark:text-[#ffffff0a] select-none leading-none tracking-tight z-0 top-0 left-1/2 -translate-x-1/2">
        PROJECTS
      </h1>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl">
        <div className="relative pl-4 border-l border-border-primary space-y-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group cursor-pointer pb-4 border-b border-border-primary last:border-none"
            >
              <div className="relative text-base md:text-lg font-medium text-accent-light tracking-wide transition-all group-hover:pl-1.5">
                {project.title}
                <span className="absolute left-[-0.9rem] top-1 w-2 h-2 bg-accent-light rounded-full"></span>
                <span className="block w-0 h-[1px] bg-accent-light group-hover:w-full transition-all duration-300 mt-1"></span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Image */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              key={hoveredProject.title}
              className="hidden md:block fixed z-50 pointer-events-none"
              style={{
                top: mousePos.y + 20,
                left: mousePos.x + 20,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={hoveredProject.image}
                alt={hoveredProject.title}
                className="w-56 rounded-lg shadow-lg border border-border-primary"
                animate={{
                  rotate: [0, 2, -2, 1, -1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectSection;
