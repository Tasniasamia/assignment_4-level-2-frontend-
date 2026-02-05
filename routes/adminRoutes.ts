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
        name: "Meal Management",
        url: "/admin/meal-management",
      },
      {
        name: "Order Management",
        url: "/admin/order-management",
      },
      {
        name:'Setting',
        url:'/admin/setting'
      }
    ],
  }