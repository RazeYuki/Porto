'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, ChevronDown, ChevronUp, ExternalLink, FileText, GraduationCap, Search, X } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

const ASSET_PATH = '/sertifikasi/';

const FEATURED_CERTIFICATES = [
  {
    id: 'tensorflow-developer',
    title: 'TensorFlow Developer Professional Certificate',
    issuer: 'DeepLearning.AI · Coursera',
    year: '2024',
    image: 'CERTIFICATE_LANDING_PAGE~UBITAO4KFHH4.jpeg',
    description: 'Professional certificate covering neural networks, computer vision, natural language processing, and time series with TensorFlow.',
    skills: ['TensorFlow', 'Deep Learning', 'Computer Vision'],
  },
  {
    id: 'supervised-machine-learning',
    title: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'DeepLearning.AI & Stanford Online · Coursera',
    year: '2024',
    image: 'CERTIFICATE_LANDING_PAGE~0G6MF7M0TKOK.jpeg',
    description: 'Applied machine learning course covering regression and classification from DeepLearning.AI and Stanford Online.',
    skills: ['Machine Learning', 'Regression', 'Classification'],
  },
  {
    id: 'advanced-learning-algorithms',
    title: 'Advanced Learning Algorithms',
    issuer: 'DeepLearning.AI & Stanford Online · Coursera',
    year: '2024',
    image: 'CERTIFICATE_LANDING_PAGE~BR6C3JP4ZKHE.jpeg',
    description: 'DeepLearning.AI and Stanford Online course covering advanced machine learning development and evaluation.',
    skills: ['Machine Learning', 'Model Evaluation', 'Neural Networks'],
  },
  {
    id: 'generative-ai',
    title: 'Generative AI for Everyone',
    issuer: 'DeepLearning.AI · Coursera',
    year: '2024',
    image: 'CERTIFICATE_LANDING_PAGE~A1E55KKGVWW8.jpeg',
    description: 'A practical introduction to the concepts, opportunities, and applications of Generative AI.',
    skills: ['Generative AI', 'AI Applications'],
  },
  {
    id: 'bangkit-2024',
    title: 'Bangkit Academy 2024 Batch 2',
    issuer: 'Bangkit Academy',
    year: '2025',
    file: 'bangkit.jpeg',
    description: 'Certificate of completion for Bangkit Academy 2024 Batch 2, Machine Learning track.',
    skills: ['Machine Learning', 'Career Readiness', 'Capstone Project'],
  },
  {
    id: 'dicoding',
    title: 'Dicoding Course Certificate',
    issuer: 'Dicoding Indonesia',
    year: '2024',
    file: 'dicoding.jpeg',
    description: 'Professional course certificate from Dicoding Indonesia.',
    skills: ['Indonesian Tech Ecosystem', 'Professional Development'],
  },
];

const OTHER_COURSERA_IMAGES = [
  { image: 'CERTIFICATE_LANDING_PAGE~077GK01J9WWC.jpeg', title: 'Device-based Models with TensorFlow Lite' },
  { image: 'CERTIFICATE_LANDING_PAGE~0T5Y55C7R1OX.jpeg', title: 'Introduction to TensorFlow for Artificial Intelligence, Machine Learning, and Deep Learning' },
  { image: 'CERTIFICATE_LANDING_PAGE~240WUCG73XJ5.jpeg', title: 'Natural Language Processing in TensorFlow' },
  { image: 'CERTIFICATE_LANDING_PAGE~2WODO7GE99XE.jpeg', title: 'Custom Models, Layers, and Loss Functions with TensorFlow' },
  { image: 'CERTIFICATE_LANDING_PAGE~97H0S4WDLAA3.jpeg', title: 'Linear Algebra for Machine Learning and Data Science' },
  { image: 'CERTIFICATE_LANDING_PAGE~ECA0MR2IDCVD.jpeg', title: 'Sequences, Time Series and Prediction' },
  { image: 'CERTIFICATE_LANDING_PAGE~EW0RSVK5UVPB.jpeg', title: 'Browser-based Models with TensorFlow.js' },
  { image: 'CERTIFICATE_LANDING_PAGE~FZQ83SNY5DFO.jpeg', title: 'Advanced Computer Vision with TensorFlow' },
  { image: 'CERTIFICATE_LANDING_PAGE~NHPENISOWOAF.jpeg', title: 'Unsupervised Learning, Recommenders, Reinforcement Learning', issuer: 'DeepLearning.AI & Stanford Online · Coursera' },
  { image: 'CERTIFICATE_LANDING_PAGE~R21RUA9X4C7G.jpeg', title: 'Custom and Distributed Training with TensorFlow' },
  { image: 'CERTIFICATE_LANDING_PAGE~TMLMYWY3IG55.jpeg', title: 'Convolutional Neural Networks in TensorFlow' },
  { image: 'CERTIFICATE_LANDING_PAGE~V5RTB44PJ7HU.jpeg', title: 'Structuring Machine Learning Projects' },
  { image: 'CERTIFICATE_LANDING_PAGE~X1TS9ESLBUE1.jpeg', title: 'Data Pipelines with TensorFlow Data Services' },
].map((certificate, index) => ({
  id: `coursera-${index + 1}`,
  ...certificate,
  issuer: certificate.issuer || 'DeepLearning.AI · Coursera',
  year: '2024',
  description: `Certificate of completion for ${certificate.title} through Coursera.`,
  skills: ['Machine Learning', 'Online Learning'],
}));

const OTHER_PDF_FILES = [
  'Sertifikat.pdf',
  'E-Sertifikat Hamdika Putra.pdf',
  'E Sertifikat Upgrading 2.pdf',
  'E Sertifikat Hamdika Putra Latihan Dasar Kepemimpinan dan Manajemen Organisasi.pdf',
  'E Sertifikat Hamdika Putra Kajian Strategis 2023.pdf',
  'E Sertifikat Hamdika Putra Himpunan Mahasiswa Informatika Periode 2022_2023.pdf',
  'E Sertifikat Hamdika Putra Dialog Informatika 2023.pdf',
  'E Sertifikat Hamdika Putra .pdf',
  'E Sertifikat Hamdika Putra  (1).pdf',
  'E Sertifikat Hamdika Putra  (2).pdf',
  'E Sertifikat Hamdika Putra  (3).pdf',
  'E Sertifikat Hamdika Putra  (4).pdf',
  'E Sertifikat Hamdika Putra  (5).pdf',
].map((file, index) => ({
  id: `document-${index + 1}`,
  title: index === 5 ? 'Informatics Student Association Certificate' : 'Organization & Professional Development Certificate',
  issuer: 'Informatics Student Association',
  year: index < 6 ? '2023' : '2024',
  file,
  type: 'pdf',
  description: 'Certificate document for organizational activities and professional development.',
  skills: ['Leadership', 'Organization'],
}));

const CERTIFICATES = [...FEATURED_CERTIFICATES, ...OTHER_COURSERA_IMAGES, ...OTHER_PDF_FILES];

function CertificatePreview({ certificate, className = '' }) {
  const hasPdf = certificate.type === 'pdf' || certificate.file?.endsWith('.pdf');
  
  if (hasPdf) {
    return (
      <div className={`flex aspect-[16/10] items-center justify-center bg-[radial-gradient(circle_at_top,#253763,#131723_60%,#0c0e14)] ${className}`}>
        <div className="flex flex-col items-center text-center">
          <FileText className="size-12 text-[#60a5fa]" />
          <span className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-[#dbeafe]">Certificate PDF</span>
        </div>
      </div>
    );
  }

  const imageSrc = certificate.file || certificate.image;
  if (!imageSrc) {
    return (
      <div className={`flex aspect-[16/10] items-center justify-center bg-[radial-gradient(circle_at_top,#253763,#131723_60%,#0c0e14)] ${className}`}>
        <FileText className="size-12 text-[#60a5fa]" />
      </div>
    );
  }

  return <img src={`${ASSET_PATH}${imageSrc}`} alt={certificate.title} className={`aspect-[16/10] w-full object-cover object-center ${className}`} />;
}

function CertificateCard({ certificate, onOpen }) {
  const { lang } = useLanguage();

  return (
    <button type="button" onClick={() => onOpen(certificate)} className="group overflow-hidden rounded-2xl border border-[#222736] bg-[#121522] text-left shadow-[0_16px_35px_rgba(0,0,0,.2)] transition-all hover:-translate-y-1 hover:border-[#4f46e5]/70 hover:shadow-[0_22px_45px_rgba(30,64,175,.22)]">
      <div className="relative overflow-hidden bg-[#1a2030]">
        <CertificatePreview certificate={certificate} className="transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute inset-0 grid place-items-center bg-[#08090b]/0 opacity-0 transition-all duration-300 group-hover:bg-[#08090b]/45 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f8fafc]/90 px-4 py-2 text-xs font-bold text-[#10131a]"><Search className="size-3.5" /> {lang === 'ID' ? 'Pratinjau' : 'Preview'}</span>
        </span>
      </div>
      <div className="p-5">
        <p className="flex items-center gap-2 text-xs text-[#adb9ce]"><Award className="size-3.5 text-[#7c6cff]" /> {certificate.year}</p>
        <h3 className="mt-3 line-clamp-2 text-base font-bold leading-5 text-[#f8fafc]">{certificate.title}</h3>
        <p className="mt-1 text-xs font-semibold text-[#22d3ee]">{certificate.issuer}</p>
      </div>
    </button>
  );
}

function CertificateModal({ certificate, onClose }) {
  const { lang } = useLanguage();
  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const asset = `${ASSET_PATH}${certificate.file || certificate.image}`;
  const isPdf = certificate.type === 'pdf' || certificate.file?.endsWith('.pdf');
  
  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020308]/80 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose} role="dialog" aria-modal="true" aria-label={`Detail ${certificate.title}`}>
      <motion.article className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#2b3040] bg-[#0d1017] shadow-2xl" initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }} onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-[#111827]/85 text-[#f8fafc] transition hover:bg-[#273044]" aria-label={lang === 'ID' ? 'Tutup detail sertifikat' : 'Close certificate details'}><X className="size-5" /></button>
        <div className="bg-[#171d2b] p-4 sm:p-6">
          {isPdf ? (
            <iframe src={`${asset}#view=FitH`} title={certificate.title} className="h-[42vh] min-h-[280px] w-full rounded-lg bg-white" />
          ) : (
            <img src={asset} alt={certificate.title} className="w-full rounded-lg bg-white object-contain" />
          )}
        </div>
        <div className="p-6 sm:p-7">
          <p className="flex items-center gap-2 text-sm text-[#d8a4ff]"><Award className="size-4" /> {certificate.year}</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#f8fafc] sm:text-3xl">{certificate.title}</h2>
          <p className="mt-1 text-sm font-bold text-[#22d3ee]">{certificate.issuer}</p>
          <p className="mt-5 text-sm leading-6 text-[#b6c1d4]">{certificate.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {certificate.skills?.map((skill) => <span key={skill} className="rounded-full border border-[#293041] bg-[#131824] px-3 py-1 text-xs text-[#c2cede]">{skill}</span>)}
          </div>
          <a href={asset} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#76a9ff] hover:text-[#a6c5ff]"><ExternalLink className="size-4" /> {lang === 'ID' ? 'Buka file asli' : 'Open original file'}</a>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function CertificatesSection() {
  const { lang } = useLanguage();
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const displayedCertificates = showAll ? CERTIFICATES : FEATURED_CERTIFICATES;

  return (
    <section id="certificates" className="theme-section w-full bg-[#08090b] px-5 py-20 text-[#f8fafc] sm:px-8 lg:px-12 lg:py-24 xl:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.header className="mx-auto max-w-3xl text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#b6a9d9]">{lang === 'ID' ? 'Bukti Pembelajaran' : 'Proof of Learning'}</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.05em] text-[#f8fafc] sm:text-5xl">{lang === 'ID' ? 'Sertifikat' : 'Certificates'}</h2>
          <p className="mt-4 text-base leading-7 text-[#b6c1d4]">{lang === 'ID' ? 'Pilihan sertifikat pembelajaran, program, dan pengalaman organisasi yang telah saya selesaikan.' : 'Selected learning certificates, programs, and organizational experiences I have completed.'}</p>
        </motion.header>

        <motion.div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" layout>
          {displayedCertificates.map((certificate) => <CertificateCard key={certificate.id} certificate={certificate} onOpen={setSelectedCertificate} />)}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => setShowAll((current) => !current)} className="inline-flex items-center gap-2 rounded-full border border-[#34415b] bg-[#101522] px-5 py-3 text-sm font-bold text-[#dce8ff] transition hover:border-[#668cff] hover:bg-[#17223a]">
            {showAll
              ? <><ChevronUp className="size-4" /> {lang === 'ID' ? 'Sembunyikan sertifikat tambahan' : 'Hide additional certificates'}</>
              : <><GraduationCap className="size-4" /> {lang === 'ID' ? 'Lihat semua sertifikat' : 'View all certificates'} ({CERTIFICATES.length}) <ChevronDown className="size-4" /></>}
          </button>
        </div>
      </div>

      <AnimatePresence>{selectedCertificate && <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />}</AnimatePresence>
    </section>
  );
}
