// app/layout.jsx
'use client'; // Keep this here for the preloader

import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import { useState, useEffect } from 'react'; // Ensure useState and useEffect are imported

const inter = Inter({ subsets: ['latin'] });

// THERE SHOULD BE NO metadata EXPORT HERE!

export default function RootLayout({ children }) {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  const handlePreloaderFinish = () => {
    setIsPreloaderVisible(false);
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        {isPreloaderVisible && (
          <Preloader onFinish={handlePreloaderFinish} />
        )}

        {/* Add class to control main content visibility */}
        <div className={`transition-opacity duration-500 ${isPreloaderVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Header />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}