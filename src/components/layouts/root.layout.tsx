import "@/theme/globals.css";

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { PropsWithChildren } from "react";
import { getLocaleParam } from "@/i18n/getLocaleParam";
import { fontMono, fontSans } from "@/theme/fonts";
import type { RouteProps } from "@/types/route-props";
import { Providers } from "./root/providers";

export const metadata = async (): Promise<Metadata> => {
  const t = await getTranslations("rootLayout");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
};

export async function RootLayout(props: PropsWithChildren<RouteProps>) {
  const locale = await getLocaleParam(props.params);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        <Providers locale={locale}>{props.children}</Providers>
      </body>
    </html>
  );
}
