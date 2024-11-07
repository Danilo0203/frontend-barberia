import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ["localhost", "frontend-barberia-production.up.railway.app", "frontend-barberia-production.up.railway.app/api/auth/session"],
  },
};

export default nextConfig;
