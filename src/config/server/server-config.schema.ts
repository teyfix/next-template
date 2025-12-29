import z from "zod";
import { envArray } from "../shared/helpers";
import type { ConfigModel } from "../shared/types";

export const ServerConfigSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),

  DATABASE_URL: z.url({ protocol: /^postgresql$/ }),
  DATABASE_SCHEMA: z.string().regex(/^[a-z]\w*$/i),

  BETTER_AUTH_SECRET: z.string().trim().min(32),
  BETTER_AUTH_ADMIN_USER_IDS: envArray().pipe(z.array(z.uuid())),
  BETTER_AUTH_TRUSTED_ORIGINS: envArray().pipe(z.array(z.url())),
  BETTER_AUTH_ANON_EMAIL_DOMAIN: z.hostname(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

export type ServerConfigModel = ConfigModel<z.infer<typeof ServerConfigSchema>>;
