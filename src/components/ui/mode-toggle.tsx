"use client";

import { CheckIcon, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ModeToggle = (props: React.ComponentProps<typeof Button>) => {
  const t = useTranslations("modeToggle");
  const { theme, setTheme } = useTheme();

  const ModeItem = (props: { mode: string; label: string }) => {
    return (
      <DropdownMenuItem onClick={() => setTheme(props.mode)}>
        <span>{props.label}</span>
        {theme === props.mode && <CheckIcon />}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" {...props}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{t("toggle")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ModeItem mode="light" label={t("option.light")} />
        <ModeItem mode="dark" label={t("option.dark")} />
        <ModeItem mode="system" label={t("option.system")} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
