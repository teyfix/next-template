import { neon } from "@neondatabase/serverless";
import { ServerConfig } from "@/config/server.config";

/**
 * Standalone Neon client for low-level or non-ORM access.
 * Kept separate from higher-level abstractions (e.g. Drizzle)
 * for cases where a bare SQL client is required.
 */
export const neonClient = neon(ServerConfig.DATABASE_URL);
