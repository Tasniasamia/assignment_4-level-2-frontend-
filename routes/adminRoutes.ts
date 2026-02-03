import { route } from "@/types";

export const adminRoutes:route = {

   
    documents: [
      {
        name: "User Management",
        url: "/admin/user-management",
      },
      {
        name: "Meal Category Management",
        url: "/admin/category-management",
      },
      {
        name:'Setting',
        url:'/admin/setting'
      }
    ],
  }