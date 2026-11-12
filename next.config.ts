import type { NextConfig } from "next";

// Files uploaded in the backoffice are stored by the CMS API; the site serves them from its own origin.
const CMS_API_URL = (process.env.CMS_API_URL ?? "http://localhost:4000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/uploads/:path*", destination: `${CMS_API_URL}/uploads/:path*` }];
  },
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
