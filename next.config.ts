import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/reports/**": [
      "./src/assets/fonts/**/*",
      "./public/logo-choyal.png",
      "./public/logo-promiller.png",
      "./public/logo-rschoyal.png",
    ],
  },
};

export default nextConfig;
