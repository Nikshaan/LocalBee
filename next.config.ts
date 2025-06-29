import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localbee.onrendered.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;