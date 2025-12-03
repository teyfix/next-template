"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react/jsx-runtime";
import { IoPerson } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/use-user-mock";
import { routes } from "@/i18n/pathnames";
import { Link } from "@/i18n/routing";
import type { MenuGroupModel } from "./sidebar.types";

const useMenuContent = (): MenuGroupModel[] => {
  const t = useTranslations("dashboard.sidebar.header");

  return [
    {
      label: t("account.label"),
      items: [
        {
          icon: <IoPerson />,
          label: t("account.details.label"),
          href: routes.user.account,
        },
      ],
    },
    {
      label: t("session.label"),
      items: [
        {
          icon: <MdLogout className="text-destructive" />,
          label: t("session.signOut.label"),
          href: routes.user.signOut,
          destructive: true,
        },
      ],
    },
  ];
};

function HeaderSkeleton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton id="user-menu-skeleton" variant="outline" size="lg">
          <Avatar className="shrink-0">
            <Skeleton asChild>
              <AvatarFallback />
            </Skeleton>
          </Avatar>

          <Skeleton className="h-2 w-24" />

          <div className="flex-1"></div>

          <ChevronDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent />
    </DropdownMenu>
  );
}

export function DashboardSidebarHeader() {
  const user = useCurrentUser().data;
  const header = useMenuContent();

  if (!user) {
    return <HeaderSkeleton />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton id="user-menu" variant="outline" size="lg">
          <Avatar className="shrink-0">
            {user.image && <AvatarImage src={user.image} alt="@shadcn" />}
            <AvatarFallback>HT</AvatarFallback>
          </Avatar>

          <div className="flex-1 truncate">{user.name}</div>

          <ChevronDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-(--radix-popper-anchor-width)">
        {header
          .filter((menu) => !menu.isAdmin || user.isAdmin)
          .map((menu) => {
            return (
              <Fragment key={menu.label}>
                <DropdownMenuLabel>{menu.label}</DropdownMenuLabel>
                <DropdownMenuGroup>
                  {menu.items.map((item) => {
                    return (
                      <Link key={item.href} href={item.href}>
                        <DropdownMenuItem
                          className={clsx(
                            "flex cursor-pointer justify-between",
                            item.destructive && "text-destructive",
                          )}
                        >
                          <span>{item.label}</span>
                          {item.icon}
                        </DropdownMenuItem>
                      </Link>
                    );
                  })}
                </DropdownMenuGroup>
              </Fragment>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
