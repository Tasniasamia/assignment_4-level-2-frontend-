'use server';
import { reviewService } from "@/services/review.service";
import { Review } from "@/types";
import { updateTag } from "next/cache";

export const addReview=async(postData:Review)=>{
    try{
     const {data,error}=await reviewService.addReview(postData);
     updateTag('meal');
     return {data:data,error:error}
    }
    catch(error){
        return {data:null,error}
    }
}