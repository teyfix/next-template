import { z } from "zod";
import type { ConfigModel } from "../shared/types";

export const BrowserConfigSchema = z.object({
  imageKit: z.object({
    urlEndpoint: z.url(),
  }),
});

export type BrowserConfigModel = ConfigModel<
  z.infer<typeof BrowserConfigSchema>
>;
