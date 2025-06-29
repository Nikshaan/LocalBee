import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://local-bee-git-main-nikshaans-projects.vercel.app/',
      },
    ],
  },
};

export default nextConfig;
