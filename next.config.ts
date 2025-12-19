import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const TRAEFIK_DOMAIN = process.env.TRAEFIK_DOMAIN;

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  turbopack: {
    rules: {
      "*.yaml": {
        loaders: ["yaml-loader"],
        as: "*.js",
      },
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

if (TRAEFIK_DOMAIN) {
  nextConfig.allowedDevOrigins = [`https://${TRAEFIK_DOMAIN}`];
}

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
