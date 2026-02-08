import type { NextConfig } from 'next'
 
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "images.unsplash.com",
   
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.BACKEND_URL}/api/auth/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/api/:path*`,
      },
      {
        source: "/api/v1/:path*",
        destination: `${process.env.BACKEND_URL}/api/v1/:path*`,
      }
    ];
  },
}
 
export default config