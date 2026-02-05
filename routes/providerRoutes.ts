import { route } from "@/types";

export const providerRoutes:route= {
  
   
    documents: [
      {
        name:'Dashboard',
        url:'/provider'
      },

      {
        name: "Meal Management",
        url: "/provider/meal-management",
      },
      {
        name: "Order Management",
        url: "/provider/order-management",
      },
   
      {
        name: "Setting",
        url: "/provider/setting",
      },
    ],
  }