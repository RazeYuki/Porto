// components/Footer.jsx
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8 text-center border-t border-gray-700">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} [Nama Anda]. Semua Hak Dilindungi.</p>
        <div className="mt-4 space-x-4">
          <Link href="https://linkedin.com/in/username_anda" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300">
            LinkedIn
          </Link>
          <Link href="https://github.com/username_anda" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300">
            GitHub
          </Link>
          {/* Tambahkan link media sosial lain jika ada */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;