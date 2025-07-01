// next.config.mjs (atau next.config.js)

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Hanya tambahkan polyfill atau handle 'fs' di sisi klien
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback, // pertahankan fallback yang sudah ada
        fs: false, // Menandakan bahwa module 'fs' tidak boleh dibundel untuk sisi klien
      };
    }

    return config;
  },
};

export default nextConfig;