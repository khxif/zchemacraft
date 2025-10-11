import dotenv from 'dotenv';
import type { NextConfig } from 'next';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '../../.env') });

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_PUBLIC_API_URL: process.env.NEXT_PUBLIC_PUBLIC_API_URL,

    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
  transpilePackages: ['@zchemacraft/components', '@zchemacraft/shared'],
  reactStrictMode: true,
};

export default nextConfig;
