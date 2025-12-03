"use client";

import { GB, TR } from "country-flag-icons/react/3x2";
import { Check, Languages } from "lucide-react";
import type React from "react";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AppLocale } from "@/i18n/locales";
import { Link, usePathname } from "@/i18n/routing";
import { useAppLocale } from "@/i18n/useAppLocale";

type LocaleMap = {
  [P in AppLocale]: {
    icon: FC;
    label: string;
    locale: P;
  };
};

const localeMap: LocaleMap = {
  tr: {
    icon: TR,
    locale: "tr",
    label: "Türkçe",
  },
  en: {
    icon: GB,
    locale: "en",
    label: "English",
  },
};

const localeItems = Object.values(localeMap);

export const LangToggle = (props: React.ComponentProps<typeof Button>) => {
  const locale = useAppLocale();
  const pathname = usePathname();

  const current = localeMap[locale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" {...props}>
          <Languages />
          <span className="sr-only">{current.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {localeItems.map((item) => {
          const active = item.locale === locale;

          return (
            <DropdownMenuItem
              key={item.locale}
              disabled={active}
              className="cursor-pointer"
              asChild
            >
              <Link href={pathname} locale={item.locale}>
                <item.icon />
                <span>{item.label}</span>
                <Check className={active ? "opacity-100" : "opacity-0"} />
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
