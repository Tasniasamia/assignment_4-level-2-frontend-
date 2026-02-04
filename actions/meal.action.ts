'use server'
import { mealService } from "@/services/meal.service";
import { MenuItemPayload } from "@/types";
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