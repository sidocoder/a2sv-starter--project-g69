import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/manager/:path*",
        destination: "https://a2sv-application-platform-backend-team12.onrender.com/manager/:path*",
      },
    ];
  },
};

export default nextConfig;
