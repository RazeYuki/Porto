// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme'); // Import fontFamily dari defaultTheme

module.exports = {
  darkMode: 'class', // Mengaktifkan dark mode berdasarkan class 'dark' pada elemen html/body
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Definisi Warna dari CSS Variables (penting untuk konsistensi tema)
      // Ini adalah alias yang akan Anda gunakan di JSX Anda
      colors: {
        'primary-bg': 'var(--color-bg-primary)',
        'secondary-bg': 'var(--color-bg-secondary)',
        'primary-text': 'var(--color-text-primary)',
        'secondary-text': 'var(--color-text-secondary)',
        'border-primary': 'var(--color-border-primary)',
        'accent-light': 'var(--color-accent-light)', // Digunakan untuk warna aksen utama
        'accent-dark': 'var(--color-accent-dark)',   // Jika ada aksen berbeda untuk dark mode
      },
      // Konfigurasi Font Family (menggunakan variabel dari globals.css)
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', ...fontFamily.sans],
        mono: ['Fira Code', 'monospace'],
      },
      // Animasi dan Keyframes (untuk blobs di HeroSection)
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      animation: {
        'blob': 'blob 7s infinite',
      },
    },
  },
  plugins: [],
};