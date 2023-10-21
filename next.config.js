/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com', 'github.com', 'avatars.githubusercontent.com', 'images.ctfassets.net', 'yt3.googleusercontent.com'],
  }
}

module.exports = nextConfig
