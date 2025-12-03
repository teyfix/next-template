import { getLocale } from "next-intl/server";
import { UnknownLocaleError } from "./errors";
import { type AppLocale, hasLocale } from "./locales";

export const getAppLocale = async (): Promise<AppLocale> => {
  const locale = await getLocale();

  if (!hasLocale(locale)) {
    throw new UnknownLocaleError(locale);
  }

  return locale;
};
