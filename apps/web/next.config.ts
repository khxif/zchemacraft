import dotenv from 'dotenv';
import type { NextConfig } from 'next';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '../../.env') });

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_PUBLIC_API_URL: process.env.NEXT_PUBLIC_PUBLIC_API_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
  },
  transpilePackages: ['@zchemacraft/components', '@zchemacraft/shared'],
  reactStrictMode: true,
};

export default nextConfig;
