'use server';
import { orderService } from "@/services/order.service";
import { CreateOrderPayload } from "@/types";
import { updateTag } from "next/cache";

export const addOrder=async(postData:CreateOrderPayload)=>{
    try{
     const {data,error}=await orderService.addOrder(postData);
     updateTag('order');
     return {data:data,error:error}
    }
    catch(error){
        return {data:null,error}
    }
}
