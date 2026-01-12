import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'phxpusbjspgzjqifvocq.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'http',
        hostname: '*.googleusercontent.com',
      }

      ,
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: '*.unsplash.com',
      }
    ],
  },

  reactCompiler: true,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);