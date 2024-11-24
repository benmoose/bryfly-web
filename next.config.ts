import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CLOUDINARY_DELIVERY_HOST as string,
        pathname: `/abc/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/**`,
        port: ''
      }
    ]
  }
}

export default nextConfig
