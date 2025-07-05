// app/layout.jsx
import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import PreloaderWrapper from '../components/PreloaderWrapper';
import Script from 'next/script'; // <-- Tambahkan ini

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`}>
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
