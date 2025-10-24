import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  transpilePackages: [
    '@zchemacraft/components',
    '@zchemacraft/layouts',
    '@zchemacraft/hooks',
    '@zchemacraft/stores',
    '@zchemacraft/shared',
    '@zchemacraft/types',
  ],
  reactStrictMode: true,
};

export default nextConfig;
