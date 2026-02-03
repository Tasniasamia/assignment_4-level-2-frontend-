import { providerType } from "@/types";
import { cookies } from "next/headers";

export const providerService={
    getProvider:async({id}:{id:string})=>{
        try {
             const res = await fetch(
              `${process.env.BACKEND_URL}/api/providers/${id}`,
              {
                next:{tags:['provider']}
              }
            );
        
            const data = await res.json();
            return { data, error: null };
        
          } catch (error) {
            return { data: null, error };
          }
    },
    updateProvider:async function(providerData:providerType){
        try{
         const cookieStore = await cookies();
     
         const profileUpdate = await fetch(`${process.env.BACKEND_URL}/api/providers/profile`, {
           method: "PUT",
           headers: {
             "Content-Type": "application/json",
             Cookie: cookieStore.toString(),
            },
            
            body: JSON.stringify(providerData),
         });
         const res=await profileUpdate.json();
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