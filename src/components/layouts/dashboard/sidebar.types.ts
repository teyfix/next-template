import type { AppPathnames } from "@/i18n/pathnames";

export type MenuGroupModel = {
  label: string;
  items: MenuItemModel[];
  isAdmin?: boolean;
};

export type MenuItemModel = {
  icon: React.ReactNode;
  label: string;
  href: AppPathnames;
  destructive?: boolean;
};
