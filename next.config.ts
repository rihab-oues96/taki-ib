import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/blog", destination: "/actuality", permanent: true },
      { source: "/blog/:slug", destination: "/actuality/:slug", permanent: true },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: { qualities: [75, 100] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
