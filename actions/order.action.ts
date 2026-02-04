'use server';
import { orderService } from "@/services/order.service";
import { CreateOrderPayload, OrderQueryOptions, orderStatus} from "@/types";
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

export const getOrder=async( query?: Partial<OrderQueryOptions>)=>{
    try{
       const queries: OrderQueryOptions = {
          page: query?.page ?? 1,
          limit: query?.limit ?? 100,
          skip: query?.skip ?? 0,
    
        };
       const {data,error}=await orderService.getOrder(queries);
       return {data:data,error:error}
   }
   catch (error) {
      return { data: null, error };
      }}

export const updateOrderStatus=async(payload:{id:string,status:orderStatus})=>{
    try{
        const {data,error}=await orderService.updateOrderStatus(payload);
        updateTag('order');
        return {data:data,error:error}
    }
    catch(error){
        return {data:null,error}
    }
}