import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = 'source-map';
    }
    return config;
  },
  images: {
    remotePatterns: [{ hostname: 'books.google.com' }],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // クライアントからのリクエスト
        destination: 'http://localhost:8080/api/:path*', // 実際のバックエンドAPI
      },
    ];
  },
};

export default nextConfig;
