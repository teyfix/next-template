import { type AppLocale, hasLocale } from "./locales";

export class GetLocaleParamError extends Error {
  constructor(message: string) {
    super(`[getLocaleParam] ${message}`);
  }
}

export const getLocaleParam = async (
  params: Promise<Record<string, string | string[]>>,
): Promise<AppLocale> => {
  const { locale } = await params;

  if (locale == null) {
    throw new Error('params does not contain "locale"');
  }

  if (!hasLocale(locale)) {
    throw new GetLocaleParamError(`Unknown locale "${locale}"`);
  }

  return locale;
};
