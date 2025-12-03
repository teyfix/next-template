import { NextIntlClientProvider } from "next-intl";
import type { PropsWithChildren } from "react";
import type { AppLocale } from "@/i18n/locales";

export async function Providers(
  props: PropsWithChildren<{ locale: AppLocale }>,
) {
  return (
    <NextIntlClientProvider locale={props.locale}>
      {props.children}
    </NextIntlClientProvider>
  );
}
