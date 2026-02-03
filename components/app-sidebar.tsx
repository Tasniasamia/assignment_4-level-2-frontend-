"use client"
import * as React from "react"
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
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
// import { adminRoutes } from "@/routes/adminRoutes"
// import { userRoutes } from "@/routes/userRoutes"
// import { roles } from "@/constants/roles"
import { Role } from "@/types"
import { roles } from "@/constants/role"
import { adminRoutes } from "@/routes/adminRoutes"
import { cutsomerRoutes } from "@/routes/userRoutes"
import { providerRoutes } from "@/routes/providerRoutes"

export function AppSidebar({userRole, ...props }: {userRole:{role:Role} & React.ComponentProps<typeof Sidebar>}) {
  const routes =
    userRole?.role === roles.admin
      ? adminRoutes
      : userRole?.role === roles.customer
      ? cutsomerRoutes
      : userRole?.role === roles.provider
      ? providerRoutes:null;
  
if(routes?.documents.length===0 || !routes ){
  return null;
}
return ( 
 <Sidebar collapsible="offcanvas" {...props}>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
        >
          <a href="#">
            <IconInnerShadowTop className="!size-5" />
            <span className="text-base font-semibold">Acme Inc.</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
  <SidebarContent>
  <NavDocuments items={routes?.documents} />
</SidebarContent>
 </Sidebar>
  
  )
}
