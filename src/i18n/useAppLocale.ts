import { useLocale } from "next-intl";
import { UnknownLocaleError } from "./errors";
import { type AppLocale, hasLocale } from "./locales";

export const useAppLocale = (): AppLocale => {
  const locale = useLocale();

  if (!hasLocale(locale)) {
    throw new UnknownLocaleError(locale);
  }

  return locale;
};
