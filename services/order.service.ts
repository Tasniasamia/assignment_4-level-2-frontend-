import { CreateOrderPayload, OrderQueryOptions, orderStatus, QueryOptions } from "@/types";
import { cookies } from "next/headers";

export const orderService={
    addOrder:async(postData:CreateOrderPayload)=>{
        try{
            const cookieStore = await cookies();
        
            const addOrderData = await fetch(`${process.env.BACKEND_URL}/api/order`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
               },
               
               body: JSON.stringify(postData),
            });
            const res=await addOrderData.json();
            if(res?.success){
              return {data:res,error:null}
            }
            return {data:null,error:res?.error || res}
           }
          catch(error){
            return {data:null,error}
          }
    },
    getOrder: async function (queries?: Partial<OrderQueryOptions>) {
        try {
            const cookieStore = await cookies(); 
            const url = new URL(`${process.env.BACKEND_URL}/api/order`);
            if (queries) {
              Object.entries(queries).forEach(([key, value]) => {
                 if( (value!=undefined) && (value!=null)){
                  url.searchParams.append(key, String(value));
                 }
        
                
              });
            }
            const config: RequestInit = {};
            config.headers={Cookie:cookieStore.toString()}
            config.next = {  tags: ["order"] };
            const res = await fetch(url.toString(), config);
            const data = await res.json();
            return { data, error: null };
        
          } catch (error) {
            return { data: null, error };
          }
      },

      updateOrderStatus:async function(payload:{id:string,status:orderStatus}){
        try {
          const cookieStore = await cookies();
          const res = await fetch(
           `${process.env.BACKEND_URL}/api/order/${payload?.id}`,
           {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Cookie: cookieStore.toString(),
             },
             
             body: JSON.stringify(payload),
          }
         );
      
         const data = await res.json();
         if(data?.success){
          return { data:data, error: null };
      
         }
         return { data:null, error: data };
      
       } catch (error) {
         return { data: null, error };
       }
      }
}