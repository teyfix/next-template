import { ServerConfigSchema } from "./server/server-config.schema";
import { envLoader } from "./shared/helpers";

export const ServerConfig = envLoader(ServerConfigSchema, {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_SCHEMA: process.env.DATABASE_SCHEMA,
});
