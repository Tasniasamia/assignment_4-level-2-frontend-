

import AppSidebar from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { roles } from "@/constants/role";
import { userService } from "@/services/user.service"
import { Role } from "@/types";
/* use client*/
// import { setRoleCookie } from "@/helpers/utils";
// import React, { useEffect } from "react"


export default async function Page({admin,customer,provider}:{admin:React.ReactNode,customer:React.ReactNode,provider:React.ReactNode}) {
    /*use client*/
    // const userRole:{role:"admin"|"user"}={role:"admin"};
    // useEffect(()=>{
    //   setRoleCookie(userRole?.role);
    // },[userRole?.role])

    const {data,error}=await userService.getSession();
    const role = data?.data?.role;
    type UserRole = {
      role: Role;
    };
    
    const userRole: UserRole = {
      role: role === roles.admin ? roles.admin : (role === roles.customer)? roles.customer:roles.provider
    };
    
  
    
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
            <AppSidebar variant="inset"   userRole={userRole} />

      <SidebarInset>
        <SiteHeader />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-7 p-6">
          {userRole.role === "admin"? admin:userRole.role === 'customer'? customer : provider}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
