import type { Pathnames } from "next-intl/routing";
import type React from "react";
import type { locales } from "./locales";
import type { Link } from "./routing";

export type AppPathnames = Extract<
  React.ComponentProps<typeof Link>["href"],
  string
>;

export const pathnames = {
  "/": {
    en: "/",
    tr: "/",
  },
  "/sign-out": {
    en: "/sign-out",
    tr: "/cikis-yap",
  },
  "/account": {
    en: "/account",
    tr: "/hesabım",
  },
  "/admin/users": {
    en: "/admin/users",
    tr: "/yonetim/kullanicilar",
  },
  "/admin/customers": {
    en: "/admin/customers",
    tr: "/yonetim/musteriler",
  },
  "/app/contacts": {
    en: "/app/contacts",
    tr: "/panel/raporlar",
  },
  "/app/calendar": {
    en: "/app/calendar",
    tr: "/panel/takvim",
  },
  "/app/reports": {
    en: "/app/reports",
    tr: "/panel/raporlar",
  },
  "/auth/login": {
    en: "/login",
    tr: "/giris-yap",
  },
  "/hello": {
    en: "/hello",
    tr: "/merhaba",
  },
} as const satisfies Pathnames<typeof locales>;

export const routes = {
  user: {
    account: pathnames["/account"].en,
    signOut: pathnames["/sign-out"].en,
  },
  dashboard: {
    users: pathnames["/admin/users"].en,
    customers: pathnames["/admin/customers"].en,
  },
  customer: {
    contacts: pathnames["/app/contacts"].en,
    calendar: pathnames["/app/calendar"].en,
    reports: pathnames["/app/reports"].en,
  },
} as const;
