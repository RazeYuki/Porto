// components/PreloaderWrapper.jsx
'use client'; // PENTING: Ini adalah Client Component pembatas

import { useState, useEffect } from 'react';
import Header from './Header'; // Pastikan ini diimpor
import LiveClock from './LiveClock'; // Pastikan ini diimpor
import Preloader from './Preloader'; // Import komponen Preloader

const PreloaderWrapper = ({ children }) => {
  const [appReady, setAppReady] = useState(false);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  const handlePreloaderFinish = () => {
    setIsPreloaderVisible(false); // Mulai fade out preloader
    setTimeout(() => {
      setAppReady(true); // Tampilkan konten utama setelah preloader benar-benar hilang
    }, 500); // Durasi fade out preloader
  };

  return (
    <>
      {isPreloaderVisible && (
        <div className={`fixed inset-0 z-[9999] transition-opacity duration-500 ${appReady ? 'opacity-0' : 'opacity-100'}`}>
           <Preloader onFinish={handlePreloaderFinish} />
        </div>
      )}

      {/* Konten utama halaman */}
      <div className={`${appReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
        {appReady && <Header />}
        {children}
        {appReady && <LiveClock />}
      </div>
    </>
  );
};

export default PreloaderWrapper;