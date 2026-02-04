'use server';
import { cartService } from "@/services/cart.service";
import { addCartType } from "@/types/cart.type";
import { updateTag } from "next/cache";

export const addCart=async(postData:addCartType)=>{
    try{
     const {data,error}=await cartService.addCart(postData);
     updateTag('cart');
     return {data:data,error:error}
    }
    catch(error){
        return {data:null,error}
    }
}
