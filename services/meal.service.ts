import { MenuItemPayload } from "@/types";
import { cookies } from "next/headers";

export const mealService={
    addMeal:async(postData:MenuItemPayload)=>{
        try{
            const cookieStore = await cookies();
        
            const addMealData = await fetch(`${process.env.BACKEND_URL}/api/meals`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
               },
               
               body: JSON.stringify(postData),
            });
            const res=await addMealData.json();
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