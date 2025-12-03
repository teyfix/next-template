import { RootLayout } from "@/components/layouts/root.layout";
import { locales } from "@/i18n/locales";
import { withLocale } from "@/i18n/withLocale";

export const generateStaticParams = async () =>
  locales.map((locale) => ({ locale }));

export default withLocale(RootLayout);
