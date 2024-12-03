import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1536, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CLOUDINARY_DELIVERY_HOST as string,
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string}/image/**`,
        port: ''
      }
    ]
  }
}

export default nextConfig
