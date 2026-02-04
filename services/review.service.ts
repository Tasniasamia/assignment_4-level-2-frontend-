import { EMenuItemPayload, MealQueryOptions, MenuItemPayload, Review } from "@/types";
import { cookies } from "next/headers";

export const reviewService={
    addReview:async(postData:Review)=>{
        try{
            const cookieStore = await cookies();
        
            const addReviewData = await fetch(`${process.env.BACKEND_URL}/api/review`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
               },
               
               body: JSON.stringify(postData),
            });
            const res=await addReviewData.json();
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