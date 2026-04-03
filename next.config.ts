import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

/** Absolute path to this project (folder that contains next.config). Fixes Turbopack picking the wrong root when another lockfile exists under the user profile. */
const PROJECT_DIR = path.dirname(fileURLToPath(import.meta.url));

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Pin Turbopack to this repo; avoids stale graphs when Next infers e.g. C:\Users\...\ as the workspace root.
  turbopack: {
    root: PROJECT_DIR,
  },
  experimental: {
    // Smaller per-icon imports; reduces Turbopack HMR issues with react-icons barrel files.
    optimizePackageImports: ["react-icons"],
    // Avoid stale module factories after HMR when switching branches or editing icon imports.
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [48, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/(.*)\\.(jpg|jpeg|png|webp|avif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)\\.(js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
