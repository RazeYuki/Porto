// components/LiveClock.jsx
'use client'; // Gunakan 'use client' karena menggunakan useState dan useEffect

import { useState, useEffect } from 'react';

const LiveClock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Format waktu (misal: HH:MM:SS)
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    // Update setiap detik
    const intervalId = setInterval(updateClock, 1000);
    updateClock(); // Panggil sekali di awal untuk menampilkan waktu segera

    // Cleanup interval saat komponen dilepas
    return () => clearInterval(intervalId);
  }, []);

  return (
    // Ubah posisi dari bottom-right ke top-center
    // top-4: 16px dari atas
    // left-1/2: Geser ke tengah horizontal
    // -translate-x-1/2: Geser kembali ke kiri sebesar setengah lebar elemen itu sendiri untuk centering sempurna
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 text-xl font-semibold
                    text-primary-text transition-colors duration-300">
      {time}
    </div>
  );
};

export default LiveClock;