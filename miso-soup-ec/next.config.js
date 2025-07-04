/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
    unoptimized: true, // GitHub Pages用
  },
  output: 'export', // 静的エクスポート
  trailingSlash: true, // GitHub Pages用
  basePath: process.env.NODE_ENV === 'production' ? '/miso-soup-ec' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/miso-soup-ec/' : '',
}

module.exports = nextConfig