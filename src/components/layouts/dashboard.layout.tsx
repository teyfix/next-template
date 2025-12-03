import type { PropsWithChildren } from "react";
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
        </SidebarFooter>
      </Sidebar>
      {props.children}
    </SidebarProvider>
  );
}
