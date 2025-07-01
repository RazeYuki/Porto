// app/metadata.js

export const metadata = {
  title: 'Nama Anda | Portofolio Kreatif',
  description: 'Portofolio personal dari [Nama Anda], seorang [Profesi Anda] yang fokus pada [Keahlian Utama Anda].',
  keywords: ['portofolio', 'desainer', 'pengembang', 'nama anda', 'kreatif', 'web developer'],
  authors: [{ name: 'Nama Anda' }],
  openGraph: {
    title: 'Nama Anda | Portofolio Kreatif',
    description: 'Portofolio personal dari [Nama Anda], seorang [Profesi Anda] yang fokus pada [Keahlian Utama Anda].',
    url: 'https://nama-website-anda.com', // Ganti dengan URL website Anda
    siteName: 'Nama Anda Portofolio',
    images: [
      {
        url: 'https://nama-website-anda.com/images/og-image.jpg', // Ganti dengan URL gambar Anda
        width: 1200,
        height: 630,
        alt: 'Nama Anda Portofolio',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nama Anda | Portofolio Kreatif',
    description: 'Portofolio personal dari [Nama Anda], seorang [Profesi Anda] yang fokus pada [Keahlian Utama Anda].',
    creator: '@username_twitter_anda', // Ganti dengan username Twitter Anda
    images: ['https://nama-website-anda.com/images/og-image.jpg'], // Ganti dengan URL gambar Anda
  },
};