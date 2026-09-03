// app/layout.jsx
import './globals.css';
import PreloaderWrapper from '@/components/layout/PreloaderWrapper';
import Script from 'next/script'; // <-- Tambahkan ini

export const metadata = {
  title: 'Hamdika Putra | Machine Learning, Data Science & AI',
  description: 'Portfolio Hamdika Putra, an Informatics graduate focused on Machine Learning, Data Science, AI, data analysis, visualization, and practical applications.',
  keywords: ['machine learning', 'data science', 'artificial intelligence', 'data analysis', 'data visualization', 'python', 'tensorflow', 'portfolio'],
  authors: [{ name: 'Hamdika Putra' }],
  creator: 'Hamdika Putra',
  publisher: 'Hamdika Putra',
  openGraph: {
    title: 'Hamdika Putra | Machine Learning, Data Science & AI',
    description: 'Informatics graduate focused on Machine Learning, Data Science, AI, data analysis, and practical applications.',
    url: 'https://yourportfolio.com',
    siteName: 'Hamdika Putra Portfolio',
    images: [
      {
        url: 'https://yourportfolio.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hamdika Putra - Machine Learning, Data Science & AI Portfolio',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamdika Putra | Machine Learning, Data Science & AI',
    description: 'Informatics graduate focused on Machine Learning, Data Science, and AI.',
    creator: '@yourtwitterhandle',
    images: ['https://yourportfolio.com/twitter-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2S4ZLVZ5FS"
        />
        <Script id="ga">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2S4ZLVZ5FS');
          `}
        </Script>
      </head>
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
