import { ServerConfigSchema } from "./server/server-config.schema";
import { envLoader } from "./shared/helpers";

export const ServerConfig = envLoader(ServerConfigSchema, {
  NODE_ENV: process.env.NODE_ENV,

  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_SCHEMA: process.env.DATABASE_SCHEMA,

  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_ADMIN_USER_IDS: process.env.BETTER_AUTH_ADMIN_USER_IDS,
  BETTER_AUTH_TRUSTED_ORIGINS: process.env.BETTER_AUTH_TRUSTED_ORIGINS,
  BETTER_AUTH_ANON_EMAIL_DOMAIN: process.env.BETTER_AUTH_ANON_EMAIL_DOMAIN,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
});
