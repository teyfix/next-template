import type { PropsWithChildren } from "react";
import NextLogo from "~/public/next.svg";
import { LangToggle } from "../ui/lang-toggle";
import { ModeToggle } from "../ui/mode-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "../ui/sidebar";
import { DashboardSidebarContent } from "./dashboard/sidebar-content";
import { DashboardSidebarHeader } from "./dashboard/sidebar-header";

export async function DashboardLayout(props: PropsWithChildren) {
  return (
    <SidebarProvider className="h-full">
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DashboardSidebarHeader />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <DashboardSidebarContent />
        </SidebarContent>

        <SidebarFooter>
          <div className="flex justify-end gap-2">
            <LangToggle />
            <ModeToggle />
          </div>

          <div className="text-muted-foreground flex justify-end gap-2 *:shrink-0">
            <span className="text-sm">Powered by</span>
            <NextLogo className="h-4" />
          </div>
        </SidebarFooter>
      </Sidebar>
      {props.children}
    </SidebarProvider>
  );
}
