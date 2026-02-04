'use server'
import { mealService } from "@/services/meal.service";
import { EMenuItemPayload, MealQueryOptions, MenuItemPayload } from "@/types";
import { updateTag } from "next/cache";

export const addMeal=async(postData:MenuItemPayload)=>{
    try{
     const {data,error}=await mealService.addMeal(postData);
     updateTag('meal');
     return {data:data,error:error}
    }
    catch(error){
        return {data:null,error}
    }
}

    export const getMealByProvider=async( query?: Partial<MealQueryOptions>)=>{
    try{
       const queries: MealQueryOptions = {
         
          page: query?.page ?? 1,
          limit: query?.limit ?? 100,
          skip: query?.skip ?? 0,
          categoryId: query?.categoryId ?? "",
          dietaryPreferences: query?.dietaryPreferences ?? '',
          price: query?.price ?? 0,
        
        };
       const {data,error}=await mealService.getMealByProvider(queries);
       return {data:data,error:error}
   }
   catch (error) {
      return { data: null, error };
      }}
 
    export const getMealById=async({id}:{id:string})=>{
        try{
        const {data,error}=await mealService.getMealById({id:id});
        return {data,error}
        }
        catch(error){
            return {data:null,error}
        }
    }

    export const editMeal=async(postData:EMenuItemPayload)=>{
        try{
         const {data,error}=await mealService.editMeal(postData);
         updateTag('meal');
         return {data:data,error:error}
        }
        catch(error){
            return {data:null,error}
        }
    }

    
export const deleteMeal=async({id}:{id:string})=>{
    try{
    const {data,error}=await mealService.deleteMeal({id:id});
    updateTag('meal');
    return {data,error}
    }
    catch(error){
        return {data:null,error}
    }}