import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_ROOT_URL: "https://fakestoreapi.com",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/img/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
