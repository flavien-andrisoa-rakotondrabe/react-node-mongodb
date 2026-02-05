import type { NextConfig } from 'next';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const remotePatterns: NextConfig['images'] extends { remotePatterns?: infer P }
  ? P
  : any = [];

if (apiUrl) {
  const url = new URL(apiUrl);
  remotePatterns.push({
    protocol: url.protocol.replace(':', ''),
    hostname: url.hostname,
    port: url.port || '',
    pathname: '/uploads/**',
  });
}

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns,
    unoptimized: nodeEnv === 'development',
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_VIDEO_URI: process.env.NEXT_PUBLIC_VIDEO_URI,
  },
  reactStrictMode: nodeEnv === 'development' ? true : false,
};

export default nextConfig;
