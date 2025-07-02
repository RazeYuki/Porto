// app/metadata.js
// TIDAK ADA 'use client' DI SINI

export const metadata = {
  title: 'Dika Portfolio', // <-- Ganti dengan nama portofolio Anda
  description: 'Portofolio Dika sebagai seorang Frontend Developer', // <-- Ganti dengan deskripsi Anda
  keywords: ['frontend', 'developer', 'react', 'nextjs', 'portfolio'],
  authors: [{ name: 'Dika' }],
  openGraph: {
    title: 'Dika Portfolio',
    description: 'Portofolio Dika sebagai seorang Frontend Developer',
    url: 'https://yourportfolio.com',
    siteName: 'Dika Portfolio',
    images: [
      {
        url: 'https://yourportfolio.com/og-image.jpg',
        width: 800,
        height: 600,
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