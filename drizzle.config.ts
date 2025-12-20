import { defineConfig } from "drizzle-kit";
import { ServerConfig } from "@/config/server.config";

export default defineConfig({
  schema: "./src/db/schemas/*.schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: ServerConfig.DATABASE_URL,
  },
});
