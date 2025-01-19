/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'www.iconsdb.com', 'www.globalassets.starbucks.com', 'starbucksstatic.cognizantorderserv.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.iconsdb.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.globalassets.starbucks.com',
        pathname: '/digitalassets/products/bev/**',
      },
      {
        protocol: 'https',
        hostname: 'starbucksstatic.cognizantorderserv.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sea-stones.com',
        pathname: '/cdn/shop/products/**',
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  trailingSlash: true,
};

module.exports = nextConfig;