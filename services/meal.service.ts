import { EMenuItemPayload, MealQueryOptions, MenuItemPayload } from "@/types";
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
    },
    getMealByProvider: async function (queries?: Partial<MealQueryOptions>,) {
      try {
        const cookieStore = await cookies(); 
        const url = new URL(`${process.env.BACKEND_URL}/api/meals/provider`);
        if (queries) {
          Object.entries(queries).forEach(([key, value]) => {
             if((value!="") && (value!=undefined) && (value!=null)){
              url.searchParams.append(key, String(value));
             }
    
            
          });
        }
        const config: RequestInit = {};
        config.headers={Cookie:cookieStore.toString()}
        config.next = {  tags: ["meal"] };
        const res = await fetch(url.toString(), config);
        const data = await res.json();
        return { data, error: null };
    
      } catch (error) {
        return { data: null, error };
      }
    },
    // /api/meals/cml2sp1pz0001w6ykneg27die
    getMealById:async({id}:{id:string})=>{
      try {
           const res = await fetch(
            `${process.env.BACKEND_URL}/api/meals/${id}`,
            {
              next:{tags:['meal']}
            }
          );
      
          const data = await res.json();
          return { data, error: null };
      
        } catch (error) {
          return { data: null, error };
        }
    },
    editMeal:async(postData:EMenuItemPayload)=>{
      try{
          const cookieStore = await cookies();
      
          const editMealData = await fetch(`${process.env.BACKEND_URL}/api/meals/${postData?.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Cookie: cookieStore.toString(),
             },
             
             body: JSON.stringify(postData),
          });
          const res=await editMealData.json();
          if(res?.success){
            return {data:res,error:null}
          }
          return {data:null,error:res?.error || res}
         }
        catch(error){
          return {data:null,error}
        }
  },
  deleteMeal:async(id:{id:string})=>{
        
    try{
        const cookieStore = await cookies();
    
        const deleteCategoryData = await fetch(`${process.env.BACKEND_URL}/api/meals/${id?.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
           }
           
        });
        const res=await deleteCategoryData.json();
        if(res?.success){
          return {data:res,error:null}
        }
        return {data:null,error:res?.error || res}
       }
      catch(error){
        return {data:null,error}
      }
  },

  getAllMeal: async function (queries?: Partial<MealQueryOptions>,) {
    try {
      const url = new URL(`${process.env.BACKEND_URL}/api/meals`);
      if (queries) {
        Object.entries(queries).forEach(([key, value]) => {
           if((value!="") && (value!=undefined) && (value!=null)){
            url.searchParams.append(key, String(value));
           }
  
          
        });
      }
      const config: RequestInit = {};
      config.next = {  tags: ["meal"] };
      const res = await fetch(url.toString(), config);
      const data = await res.json();
      return { data, error: null };
  
    } catch (error) {
      return { data: null, error };
    }
  }
}