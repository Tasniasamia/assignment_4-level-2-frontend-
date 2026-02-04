import { CreateOrderPayload } from "@/types";
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
    }
}