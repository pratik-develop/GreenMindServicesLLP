/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages with @cloudflare/next-on-pages
  trailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true,
    // Image domains for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Image formats to use
    formats: ['image/avif', 'image/webp'],
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Enable SWC minification
  swcMinify: true,
}

module.exports = nextConfig