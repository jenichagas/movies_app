import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },

  rewrites: async () => {
    return [
      {
        source: "/minha-lista",
        destination: "/myList",
      },
    ];
  },
};

export default nextConfig;
