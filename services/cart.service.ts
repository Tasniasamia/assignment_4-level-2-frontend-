import { addCartType } from "@/types/cart.type";
import { cookies } from "next/headers";

export const cartService={
    addCart:async(postData:addCartType)=>{
        try{
            const cookieStore = await cookies();
        
            const addCartData = await fetch(`${process.env.BACKEND_URL}/api/cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
               },
               
               body: JSON.stringify(postData),
            });
            const res=await addCartData.json();
            if(res?.success){
              return {data:res,error:null}
            }
            return {data:null,error:res?.error || res}
           }
          catch(error){
            return {data:null,error}
          }
    },

}