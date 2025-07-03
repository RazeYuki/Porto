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
  title: 'RazeYuki',
  description: 'My Portfolio',
  keywords: ['bigdata', 'developer', 'react', 'nextjs', 'portfolio', 'web development'],
  authors: [{ name: 'Dika' }],
  creator: 'Dika',
  publisher: 'Dika',
  openGraph: {
    title: 'RazeYuki',
    description: 'My Portfolio',
    url: 'https://yourportfolio.com',
    siteName: 'Dika Portfolio',
    images: [
      {
        url: 'https://yourportfolio.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Razeyuki',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RazeYuki',
    description: 'My Portfolio',
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

          <PreloaderWrapper>
            {children}
          </PreloaderWrapper>
        </div>
      </body>
    </html>
  );
}
