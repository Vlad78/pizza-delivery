/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'media.dodostatic.net',
      'cdn.dodostatic.net',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'cdn.sanity.io',
      '800degreespizza.com',
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
