'use server'
import { mealService } from "@/services/meal.service";
import { MealQueryOptions, MenuItemPayload } from "@/types";
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
 
 