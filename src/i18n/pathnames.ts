import type { Pathnames } from "next-intl/routing";
import type { locales } from "./locales";

export const pathnames = {
  "/": {
    tr: "/",
    en: "/",
  },
} as Pathnames<typeof locales>;
