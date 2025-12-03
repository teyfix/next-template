import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "./locales";

export default getRequestConfig(async ({ locale, requestLocale }) => {
  locale ||= await requestLocale;

  if (!hasLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  const { default: messages } = await import(`../../messages/${locale}.yaml`);

  return {
    locale,
    timeZone: "Europe/Istanbul",
    messages,
  };
});
