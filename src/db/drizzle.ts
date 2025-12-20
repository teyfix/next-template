import { drizzle } from "drizzle-orm/neon-http";
import { neonClient } from "./neon-client";
import * as schema from "./schema";

/**
 * Drizzle-powered database instance.
 * Prefer this over using the Neon client directly unless low-level access
 * is explicitly required.
 */
export const db = drizzle({
  client: neonClient,
  logger: true,
  schema,
});
