// components/DigitalClock.jsx
'use client'; // Penting: Ini harus Client Component karena menggunakan state dan efek

import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Memperbarui waktu setiap detik
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Membersihkan interval saat komponen dilepas (unmount)
    return () => clearInterval(timerId);
  }, []); // [] agar efek hanya berjalan sekali saat mount dan cleanup saat unmount

  // Format waktu menjadi HH:MM:SS
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="text-xl font-mono text-teal-400 mr-4">
      {formatTime(time)}
    </div>
  );
};

export default DigitalClock;