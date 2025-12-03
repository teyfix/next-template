import { setRequestLocale } from "next-intl/server";
import type React from "react";
import type { RouteProps } from "@/types/route-props";
import { getLocaleParam } from "./getLocaleParam";

/**
 * Higher-order component that injects a locale into a Next.js Server Component
 * based on the current route parameters.
 *
 * This is designed for Next.js App Router layouts/pages that use a `[locale]`
 * segment. It reads the locale from `props.params`, initializes `next-intl`
 * for the current request via `setRequestLocale`, and then renders the wrapped
 * component with the original props untouched.
 *
 * @template Props - The expected props of the wrapped component.
 *
 * @param {React.ComponentType<Props>} Component
 *   A React Server Component that requires locale initialization before render.
 *
 * @returns {(props: import("@/types/route-props").RouteProps<Props>) => Promise<JSX.Element>}
 *   An async wrapper component that resolves the locale and renders the inner component.
 *
 * @example
 * // Locales must be defined in `app/[locale]/layout.tsx` once
 *
 * export const generateStaticParams = () =>
 *   locales.map(locale => ({ locale }));
 *
 * @example
 * // Example usage with a layout
 * import { RootLayout } from "@/components/layouts/root.layout";
 * import { locales } from "@/i18n/locales";
 * import { withLocale } from "@/i18n/withLocale";
 *
 * export default withLocale(RootLayout);
 *
 * @example
 * // Example usage with a page
 * import { HomePage } from "@/components/pages/home.page";
 * import { locales } from "@/i18n/locales";
 * import { withLocale } from "@/i18n/withLocale";
 *
 * export default withLocale(HomePage);
 */
export const withLocale = <Props extends object>(
  Component: React.ComponentType<Props>,
) => {
  const WithLocale = async (props: RouteProps<Props>) => {
    const locale = await getLocaleParam(props.params);

    setRequestLocale(locale);

    return <Component {...props} />;
  };

  return WithLocale;
};
