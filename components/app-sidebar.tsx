"use client";
import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import { adminRoutes } from "@/routes/adminRoutes"
// import { userRoutes } from "@/routes/userRoutes"
// import { roles } from "@/constants/roles"
import { Role } from "@/types";
import { roles } from "@/constants/role";
import { adminRoutes } from "@/routes/adminRoutes";
import { cutsomerRoutes } from "@/routes/userRoutes";
import { providerRoutes } from "@/routes/providerRoutes";
import Link from "next/link";
type AppSidebarProps = {
  userRole?: {
    role: string;
  };
  variant?: "inset" | "default"; // 👈 add this
};
// export function AppSidebar({
//   userRole,
//   ...props
// }: {
//   userRole: { role: Role } & React.ComponentProps<typeof Sidebar>;
// }) {
  const AppSidebar = ({ userRole, variant = "default" }: AppSidebarProps) => {
  const routes =
    userRole?.role === roles.admin
      ? adminRoutes
      : userRole?.role === roles.customer
      ? cutsomerRoutes
      : userRole?.role === roles.provider
      ? providerRoutes
      : null;

  if (routes?.documents.length === 0 || !routes) {
    return null;
  }
  return (
    <Sidebar >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">F</span>
                </div>
                <span className="text-xl font-bold text-foreground hidden sm:inline">
                  FoodHub
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavDocuments items={routes?.documents} />
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;