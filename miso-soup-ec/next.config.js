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
  // GitHub Pagesのサブパス設定（リポジトリ名が必要な場合のみ）
  // basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '',
}

module.exports = nextConfig