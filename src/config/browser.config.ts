import { BrowserConfigSchema } from "./browser/browser-config.schema";
import { envLoader } from "./shared/helpers";

export const BrowserConfig = envLoader(BrowserConfigSchema, {
  imageKit: {
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  },
});
