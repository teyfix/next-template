"use client";

import { useTranslations } from "next-intl";
import {
  BsBuildingFill,
  BsPeopleFill,
  FaUsersCog,
  PiCalendarFill,
  RiBarChartFill,
} from "@/components/icons";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Slot } from "@/components/ui/slot";
import { useCurrentUser } from "@/hooks/use-user-mock";
import { routes } from "@/i18n/pathnames";
import { Link } from "@/i18n/routing";
import type { MenuGroupModel } from "./sidebar.types";

const useMenuContent = (): MenuGroupModel[] => {
  const t = useTranslations("dashboard.sidebar.content");

  return [
    {
      label: t("admin.label"),
      isAdmin: true,
      items: [
        {
          icon: <FaUsersCog />,
          label: t("admin.users.label"),
          href: routes.dashboard.users,
        },
        {
          icon: <BsBuildingFill />,
          label: t("admin.customers.label"),
          href: routes.dashboard.customers,
        },
      ],
    },
    {
      label: t("customer.label"),
      isAdmin: false,
      items: [
        {
          icon: <BsPeopleFill />,
          label: t("customer.contacts.label"),
          href: routes.customer.contacts,
        },
        {
          icon: <PiCalendarFill />,
          label: t("customer.calendar.label"),
          href: routes.customer.calendar,
        },
        {
          icon: <RiBarChartFill />,
          label: t("customer.reports.label"),
          href: routes.customer.reports,
        },
      ],
    },
  ];
};

function ContentSkeleton() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <Skeleton className="h-3 w-24" />
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-2 w-20" />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-2 w-32" />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-2 w-24" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function DashboardSidebarContent() {
  const user = useCurrentUser().data;
  const menu = useMenuContent();

  if (!user) {
    return <ContentSkeleton />;
  }

  return menu
    .filter((group) => !group.isAdmin || user.isAdmin)
    .map((group) => (
      <SidebarGroup key={group.label}>
        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
        <SidebarMenu>
          {group.items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <Link href={item.href}>
                  <Slot className="size-6">{item.icon}</Slot>
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroupContent></SidebarGroupContent>
      </SidebarGroup>
    ));
}
