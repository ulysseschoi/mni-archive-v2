/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // NOTE: 'output: export' is disabled for local development
  // Enable for Cloudflare Pages deployment when needed
  // However, Cloudflare Pages now supports Next.js server mode!
  typescript: {
    ignoreBuildErrors: true, // Ignore errors for initial deployment
  },
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.genspark.ai',
        pathname: '/api/files/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
