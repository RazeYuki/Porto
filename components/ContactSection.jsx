// components/ContactSection.jsx
'use client'; // Pastikan ini ada jika ada interaktivitas klien

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => { // PASTIKAN NAMA 'ContactSection' DI SINI
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // --- PENTING: Ganti URL ini dengan layanan formulir backend Anda ---
    // const formspreeUrl = "https://formspree.io/f/your_form_id";
    // const response = await fetch(formspreeUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });
    // if (response.ok) {
    //   setStatus('success');
    //   setFormData({ name: '', email: '', message: '' });
    // } else {
    //   setStatus('error');
    // }

    // --- Contoh Simulasi Pengiriman (Hapus ini saat menggunakan backend nyata) ---
    console.log('Mengirim formulir:', formData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    // --- Akhir Contoh Simulasi ---
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-800 text-gray-100">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Hubungi Saya
        </motion.h2>

        <motion.div
          className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-700"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-lg text-center mb-6 text-gray-300">
            Tertarik untuk berkolaborasi atau ingin sekadar menyapa? Jangan ragu untuk mengisi formulir di bawah ini!
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email Anda</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">Pesan Anda</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
            {status === 'success' && (
              <p className="text-green-400 text-center mt-4">Pesan berhasil dikirim! Saya akan segera menghubungi Anda.</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-center mt-4">Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti atau hubungi saya langsung.</p>
            )}
          </form>
          <div className="text-center mt-8 text-gray-400">
            <p>Atau hubungi saya langsung melalui:</p>
            <p className="text-xl font-semibold text-white mt-2">
              <a href="mailto:emailanda@example.com" className="hover:text-teal-400 transition duration-300">[emailanda@example.com]</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection; // PASTIKAN ADA 'export default ContactSection;'