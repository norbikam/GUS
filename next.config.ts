import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // api: {
  //   bodyParser: {
  //     sizeLimit: '10mb',
  //   },
  // },
};

// Integracja z next-videos
const withVideos = require('next-videos');

// Eksportuj konfigurację z next-videos
export default withVideos(nextConfig);
