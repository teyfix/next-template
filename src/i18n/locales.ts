export type AppLocale = (typeof locales)[number];

export const locales = ["tr", "en"] as const;
export const [defaultLocale] = locales;

export const hasLocale = (value: unknown): value is AppLocale =>
  locales.some((item) => item === value);
