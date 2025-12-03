import type { NextConfig } from "next";

const TRAEFIK_DOMAIN = process.env.TRAEFIK_DOMAIN;

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
};

if (TRAEFIK_DOMAIN) {
  nextConfig.allowedDevOrigins = [`https://${TRAEFIK_DOMAIN}`];
}

export default nextConfig;
