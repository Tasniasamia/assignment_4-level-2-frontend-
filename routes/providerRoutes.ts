import { route } from "@/types";

export const providerRoutes:route= {
  
   
    documents: [
      {
        name: "Meal Management",
        url: "/provider/meal-management",
      },
      {
        name: "Order Management",
        url: "/provider/order-management",
      },
      {
        name:'History',
        url:'/dashboard/history'
      },
      {
        name: "Setting",
        url: "/provider/setting",
      },
    ],
  }