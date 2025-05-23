import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1536, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_CLOUDINARY_DELIVERY_HOST}`,
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/**`,
        search: "",
        port: "",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    serverComponentsHmrCache: true,
  },
}

export default nextConfig
