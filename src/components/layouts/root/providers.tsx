import { NextIntlClientProvider } from "next-intl";
import type { PropsWithChildren } from "react";
import type { AppLocale } from "@/i18n/locales";
import { ReactQueryProvider } from "./providers/react-query.provider";
import { ThemeProvider } from "./providers/theme.provider";

export async function Providers(
  props: PropsWithChildren<{ locale: AppLocale }>,
) {
  return (
    <NextIntlClientProvider locale={props.locale}>
      <ReactQueryProvider>
        <ThemeProvider>{props.children}</ThemeProvider>
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
