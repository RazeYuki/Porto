// app/layout.jsx
// Ini adalah Server Component. TIDAK ADA 'use client' di sini.

import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
// Hapus baris ini: import Preloader from '../components/Preloader';

import PreloaderWrapper from '../components/PreloaderWrapper'; // Import PreloaderWrapper

// --- Konfigurasi Font ---
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

// --- Metadata (SEO) ---
export const metadata = {
  title: 'Dika Portfolio',
  description: 'Portofolio Dika sebagai seorang Frontend Developer',
  keywords: ['frontend', 'developer', 'react', 'nextjs', 'portfolio', 'web development'],
  authors: [{ name: 'Dika' }],
  creator: 'Dika',
  publisher: 'Dika',
  openGraph: {
    title: 'Dika Portfolio',
    description: 'Portofolio Dika sebagai seorang Frontend Developer',
    url: 'https://yourportfolio.com',
    siteName: 'Dika Portfolio',
    images: [
      {
        url: 'https://yourportfolio.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dika Portfolio Website',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dika Portfolio',
    description: 'Portofolio Dika sebagai seorang Frontend Developer',
    creator: '@yourtwitterhandle',
    images: ['https://yourportfolio.com/twitter-image.jpg'],
  },
};

// --- Root Layout Component ---
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`}> {/* HAPUS 'dark' di sini */}
      <body className="font-sans antialiased bg-primary-bg text-primary-text transition-colors duration-300">
        <div className="h-screen overflow-y-scroll snap-y snap-proximity overflow-x-hidden scroll-smooth">
          {/*
            PENTING: Gunakan PreloaderWrapper sebagai pembungkus utama.
            Ini akan memastikan preloader Anda berfungsi dengan benar
            di App Router.
          */}
          <PreloaderWrapper>
            {children}
          </PreloaderWrapper>
        </div>
      </body>
    </html>
  );
}