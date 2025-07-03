// app/metadata.js
// TIDAK ADA 'use client' DI SINI

export const metadata = {
  title: 'RazeYuki', // <-- Ganti dengan nama portofolio Anda
  description: 'My Portfolio', // <-- Ganti dengan deskripsi Anda
  keywords: ['BigData', 'developer', 'react', 'nextjs', 'portfolio'],
  authors: [{ name: 'Dika' }],
  openGraph: {
    title: 'RazeYuki',
    description: 'My Portfolio',
    url: 'https://yourportfolio.com',
    siteName: 'RazeYuki',
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
    title: 'Razeyuki',
    description: 'My Portfolio',
    creator: '@yourtwitterhandle',
    images: ['https://yourportfolio.com/twitter-image.jpg'],
  },
};