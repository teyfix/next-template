import z from "zod";
import type { ConfigModel } from "../shared/types";

export const ServerConfigSchema = z.object({
  DATABASE_URL: z.url({ protocol: /^postgresql$/ }),
  DATABASE_SCHEMA: z.string().regex(/^[a-z]\w*$/i),
});

export type ServerConfigModel = ConfigModel<z.infer<typeof ServerConfigSchema>>;
