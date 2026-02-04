/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Required for Cloudflare Pages static deployment
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
  // Disable server-side features for static export
  trailingSlash: true,
};

export default nextConfig;
